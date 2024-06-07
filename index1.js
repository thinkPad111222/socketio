const app = require("express")();
const http = require("http").Server(app);

const path = require("path");

const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index1.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // setTimeout(() => {
  //   // socket .send("hello");
  //   socket.emit("send", "heello");
  // }, 3000);
  socket.on("doremon", console.log);

  socket.on("disconnect", () => {
    console.log("destroyed", socket.id);
  });
});

http.listen(3000, () => console.log("server started"));
