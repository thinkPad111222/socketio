const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

var users = [];
io.on("connection", (socket) => {
  console.log("connect", socket.id);

  socket.on("setUserName", (name) => {
    if (!users.includes(name)) {
      users.push(name);
      socket.emit("setUser", { name, message: "user is set" });
    } else {
      socket.emit("existsUser", name + " is already exits");
    }
  });
  socket.on("sendMessage", (data) => {
    io.emit("newMsg", data);
  });
  socket.on("disconnect", () => {
    console.log("disconnect", socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(require("path").join(__dirname, "index4.html"));
});

http.listen(2000, () => console.log("server started"));
