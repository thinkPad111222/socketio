//namespace
const app = require("express")();
const http = require("http").Server(app);
const path = require("path");

const io = require("socket.io")(http);

// const customerIO = io.of("/customer");

var num = 1;
var full = 0;
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.join("sharoz-" + num);
  io.sockets
    .in("sharoz-" + num)
    .emit("broadcast", "you are connected to sharoz-" + num + " room ");

  full++;
  if (full >= 2) {
    full = 0;
    num++;
  }

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index3.html"));
});

http.listen(3000, () => {
  console.log("server started");
});
