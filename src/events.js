import io from "./index.js";

socket.on("teste", async (nome) => {
  io.emit("excluir_documento_sucesso", nome);
});