const ytdl = require("ytdl-core");
const publicRoomControllerClass = require("../controller/publicRoomController");
const publicRoomController = new publicRoomControllerClass();

const ConfigureMusicService = async (callback) => {
  const publicRooms = await publicRoomController.getAllPublicRooms();

  const rooms = publicRooms?.map((room) => {
    room.playList = room?.playList.sort(() => Math.random() - 0.5);

    return {
      id: room?._id?.toString(),
      songs: room?.playList,
    };
  });

  const songsWithInfo = rooms?.map(async (room) => {
    const songsWithInfo = await Promise.all(
      room?.songs?.map(async ({ songUrl, videoId, duration }) => {
        if (videoId && duration) {
          return {
            id: videoId,
            duration,
          };
        }
        if (!ytdl.validateURL(songUrl)) {
          return null;
        }

        const info = await ytdl.getBasicInfo(songUrl);

        await publicRoomController.updateSong(room.id, {
          songUrl,
          videoId: info?.videoDetails?.videoId,
          duration: info?.videoDetails?.lengthSeconds,
        });

        return {
          id: info?.videoDetails?.videoId,
          duration: info?.videoDetails?.lengthSeconds,
        };
      })
    );

    for (let i = songsWithInfo?.length - 1; i >= 0; i--) {
      if (!songsWithInfo[i]) {
        songsWithInfo?.splice(i, 1);
      }
    }

    return { ...room, songs: songsWithInfo };
  });

  Promise.all(songsWithInfo).then((processedRooms) => {
    callback(processedRooms);
  });
};

module.exports = { ConfigureMusicService };
