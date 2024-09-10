import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();

const path = url.fileURLToPath(import.meta.url);
const publicDir = path.join(path, "../..", "public");
app.use(express.static(publicDir));

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const io = new Server(servidorHttp);

export default io;