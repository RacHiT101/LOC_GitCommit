const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
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
  message: {
    require: true,
    type: String,
  },
});

const ChatModel = model("Chat", ChatSchema);

module.exports = ChatModel;
