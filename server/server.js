const app = require("./index");
const { Server } = require("socket.io");
const { ConfigureSocket } = require("./sockets");

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

ConfigureSocket(io);

io.on("connection", (socket) => {
  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta);
    // console.log("hi");
    console.log(delta)
  });
  console.log(`Socket connected`);
});
