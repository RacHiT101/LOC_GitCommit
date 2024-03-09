const roomStates = {};
const songIntervals = {};

module.exports = (io, rooms) => {
  // Initialize room state for each room in roomStates dictionary
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

  // for each room, keep an interval to keep track of the song time
  rooms?.forEach((room) => {
    songIntervals[room?.id] = null;
  });

  // Define a function to start playing the song for a room
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

    // Start a new interval for the room
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

  // Start playing songs for each room
  rooms.forEach((room) => {
    playSong(room);
  });

  // Whenever a new user joins, send the current song url, title and played upto time to the client
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
      // TODO remove user and send list of members
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
