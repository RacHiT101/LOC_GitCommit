const privateRoomModel = require("../models/PrivateRoom");

class PrivateRoomController {
  async getPrivateRooms(ownerId) {
    return privateRoomModel.find({ ownerId: ownerId });
  }
  async createPrivateRoom(
    ownerId,
    name,
    users,
    backgroundUrl,
    isVisibleToFriends
  ) {
    return privateRoomModel.create({
      ownerId,
      name,
      users,
      backgroundUrl,
      isVisibleToFriends,
    });
  }

  async findById(id) {
    return privateRoomModel.findById(id);
  }

  async updatePrivateRoomSetting(id, imageUri, isVisible) {
    await privateRoomModel.updateOne(
      {
        _id: id,
      },
      {
        backgroundUrl: imageUri,
        isVisibleToFriends: isVisible,
      }
    );
  }
}

module.exports = PrivateRoomController;
