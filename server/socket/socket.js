const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

export { io, app, server };
