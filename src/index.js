import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import db from "./database.js";

const app = express();

app.set("view engine", "ejs");

const currentPath = url.fileURLToPath(import.meta.url);
const publicDir = path.join(currentPath, "../..", "public");
app.use(express.static(publicDir));

app.get("*", async (req, res) => {
  const documentName = req.path.substring(1);
  // console.log(documentName);
  let document = await db.collection("docs").findOne({
    title: documentName
  });

  if (!document) {
    document = await db.collection("docs").insertOne({
      title: documentName,
      content: ""
    });
  }

  res.render("index", { document });
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("update-document", async ({ title, content }) => {
    const filter = { title };
    const updateDoc = {
      $set: {
        title,
        content
      }
    }

    await db.collection("docs").updateOne(filter, updateDoc);
    io.emit("sync-document", content);
  });
});

export default io;