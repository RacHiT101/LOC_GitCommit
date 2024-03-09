const roomStates = {};
const songIntervals = {};

module.exports = (io, rooms) => {
  rooms?.forEach((room) => {
    roomStates[room?.id] = {
      songIndex: 0,
      songTime: 0,
    };
  });

  const roomMemberEmails = {};
  rooms?.forEach(({ id }) => {
    roomMemberEmails[id] = [];
  });

  rooms?.forEach((room) => {
    songIntervals[room?.id] = null;
  });

  const playSong = (room) => {
    const roomIndex = rooms?.findIndex((r) => r?.id === room?.id);
    const state = roomStates[room?.id];
    const song = rooms[roomIndex].songs[state?.songIndex];

    if (!song) {
      return;
    }

    io?.to(room?.id).emit("new-song", {
      id: song?.id,
      time: state?.songTime,
    });

    songIntervals[room?.id] = setInterval(() => {
      state.songTime++;

      if (state?.songTime >= song?.duration) {
        state.songIndex++;
        if (state?.songIndex >= rooms[roomIndex]?.songs?.length) {
          state.songIndex = 0;
        }

        state.songTime = 0;

        clearInterval(songIntervals[room?.id]);

        playSong(room);
      }
    }, 1000);
  };

  rooms.forEach((room) => {
    playSong(room);
  });

  io.on("connection", (socket) => {
    socket?.on("join-room", async (roomId) => {
      console.log(`${socket?.user?.name} joined room ${roomId}`);
      if (!roomMemberEmails[roomId]) {
        roomMemberEmails[roomId] = [socket?.user?.email];
      } else if (!roomMemberEmails[roomId].includes(socket?.user?.email)) {
        roomMemberEmails[roomId].push(socket?.user?.email);
      }
      socket?.join(roomId);
      io?.to(roomId)?.emit("room-member-emails", roomMemberEmails[roomId]);
    });

    socket?.on("leave-room", (roomId) => {
      console.log(`${socket?.user?.name} left room ${roomId}`);
      const index = roomMemberEmails[roomId].indexOf(socket?.user?.email);
      index !== -1 && roomMemberEmails[roomId].splice(index, 1);
      io?.to(roomId).emit("room-member-emails", roomMemberEmails[roomId]);
      socket?.leave(roomId);
    });

    socket?.on("get-song-for-room", (roomId) => {
      const roomIndex = rooms?.findIndex((room) => room?.id === roomId);
      if (roomIndex !== -1) {
        const state = roomStates[roomId];
        const song = rooms[roomIndex]?.songs[state?.songIndex];
        if (!song) return;
        socket?.emit("song", {
          id: song?.id,
          time: state?.songTime,
        });
      }
    });
  });
};
