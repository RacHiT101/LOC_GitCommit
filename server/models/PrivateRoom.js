const { Schema, model } = require("mongoose")

const PrivateRoomSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  ownerId: {
    required: true,
    type: String,
  },
  users: {
    required: true,
    type: [String],
    default: []
  },
  backgroundUrl: {
    required: true,
    type: String
  },
  isVisibleToFriends: {
    required: true,
    type: Boolean,
    default: false
  }
})

const PrivateRoom = model("PrivateRoom", PrivateRoomSchema)

module.exports = PrivateRoom
