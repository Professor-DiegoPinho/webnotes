import { updateDocument } from "./repository.js";

export function setupEvents(io) {
  io.on("connection", (socket) => {
    socket.on("update-document", async ({ title, content }) => {
      await updateDocument(title, content);

      io.emit("sync-document", content); // io
    });
  });
}