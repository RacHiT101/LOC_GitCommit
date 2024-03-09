const { firebaseSocketAuth } = require("../middlewares/firebaseAuth");

const registerMessageHandler = require("./messageHandler");
const registerMusicHandler = require("./musicHandler");
const { ConfigureMusicService } = require("../YtMusic/music");

const ConfigureSocket = (io) => {
  io?.use(firebaseSocketAuth);

  ConfigureMusicService((rooms) => {
    registerMusicHandler(io, rooms);
  });

  io?.on("connection", (socket) => {
    console.log(
      `${socket?.user?.email} with id ${socket?.user?.uid} connected`
    );

    registerMessageHandler(io, socket);

    socket?.on("disconnect", () => {
      console.log(
        `${socket?.user?.email} with id ${socket?.user?.uid} disconnected`
      );

      socket?.leaveAll();
    });
  });
};

module.exports = { ConfigureSocket };
