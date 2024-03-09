const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
  todoList: {
    required: true,
    type: [Object],
    default: [],
    validate: {
      validator: (values) =>
        !values.some(
          (value) =>
            typeof value.content !== "string" ||
            typeof value.isCompleted !== "boolean"
        ),
      message: () =>
        "A task must has 'content' in string and 'isCompleted' in boolean",
    },
  },
  assets: {
    required: true,
    type: [String],
    default: [],
  },
  isPrivateRoomUnlocked: {
    required: true,
    type: Boolean,
    default: false,
  },
  experience: {
    required: true,
    type: Number,
    default: 0,
  },
  profile: {
    required: true,
    type: String,
    default: "default.svg",
  },
  coins: {
    required: true,
    type: Number,
    default: 1200,
  },
  profilePhotoUrl: {
    required: false,
    type: String,
  },
  friends: {
    required: true,
    type: [String],
    default: [],
  },
  playList: {
    required: true,
    type: [Object],
    default: [],
  },
});

const User = model("users", UserSchema);

module.exports = User;
