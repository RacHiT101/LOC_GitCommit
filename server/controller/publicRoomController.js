const publicRoomModel = require("../models/PublicRoom");

class PublicRoomController {
  async getAllPublicRooms() {
    return publicRoomModel.find();
  }

  async getPublicRoom(id) {
    return publicRoomModel.findById(id);
  }

  async createPublicRoom(name, users, playList, backgroundUrl,categories) {
    return await publicRoomModel.create({
      name,
      users,
      playList,
      backgroundUrl,
      categories
    });
  }

  async updateSong(id, song) {
    // get the room
    const room = await this.getPublicRoom(id);

    // get the index of the song that has the same songUrl
    const songIndex = room.playList.findIndex(
      (songInRoom) => songInRoom.songUrl === song.songUrl
    );

    // replace the song object at that index with the new song object
    room.playList[songIndex] = song;

    // save the room
    await room.save();
  }

  async addSong(id, song) {
    // get the room
    const room = await this.getPublicRoom(id);

    // add the song to the room
    room?.playList.push(song);

    // save the room
    await room.save();
  }
}

module.exports = PublicRoomController;
