const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  // Sending user disconnected message to server-side
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

// Rendering ejs file
app.get("/", (req, res) => {
  res.render("index");
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// P
server.listen(8001, () => {
  console.log("Server listening on port 8001");
});
