window.addEventListener("load", (event) => {
  const path = window.location.pathname;
  const result = path.substring(1);
  console.log(result);

  const socket = io();
  const textArea = document.getElementsByTagName("textarea")[0];
  textArea.addEventListener("keyup", (event) => {
    socket.emit("update-document", {
      title: result,
      content: textArea.value
    });
  });

  socket.on("sync-document", content => textArea.value = content);
});