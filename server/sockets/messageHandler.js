const chatControllerClass = require("../controller/chatController");
const chatController = new chatControllerClass();

const messageHandler = (io, socket) => {
  socket?.on("message", (message) => {
    io?.emit("message", message);
  });

  socket?.on("send-message", async (data) => {
    socket?.emit("message", data);

    io?.sockets?.sockets?.forEach((eachSocket) => {
      if (eachSocket?.user?.email === data?.receiverEmail) {
        eachSocket?.emit("message", data);

        eachSocket?.emit("message-notification", data);
      }
    });

    await chatController.createChat(
      data?.senderId,
      data?.receiverId,
      data?.message,
      data?.timestamp
    );
  });

  socket?.on("send-group-message-in-room", (data) => {
    io?.to(data?.roomId).emit("new-message", data);
  });

  socket?.on("send-private-message-in-room", (data) => {
    socket?.emit("new-message", data);
    Array.from(io.sockets?.sockets?.values())
      .find((s) => s.user?.email === data?.receiverEmail)
      ?.emit("new-message", data);
  });
};

module.exports = messageHandler;
