const { Schema, model } = require("mongoose");

const FriendRequestSchema = new Schema({
  sender: {
    require: true,
    type: String,
  },
  receiver: {
    require: true,
    type: String,
  },
  timestamp: {
    require: true,
    type: Number,
  },
  status: {
    require: true,
    type: String,
    enum: ["approved", "rejected", "pending"],
  },
});

const FriendRequestModel = model("FriendRequest", FriendRequestSchema);

module.exports = FriendRequestModel;
