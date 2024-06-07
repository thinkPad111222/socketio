const app = require("express")();
const http = require("http").Server(app);
const path = require("path");

const io = require("socket.io")(http);

var users = 0;
io.on("connection", (socket) => {
  users++;

  socket.emit("newuser", "hii, welcome dear");

  socket.broadcast.emit("newuser", `user number ${users}`);

  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    users--;

    console.log("a user disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index2.html"));
});

http.listen(3000, () => {
  console.log("server started");
});
