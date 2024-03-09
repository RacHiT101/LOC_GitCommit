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
  },
});

ConfigureSocket(io);
