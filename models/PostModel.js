const { Schema, model } = require("mongoose");

const Post = new Schema({
  name: String,
  body: String,
  avatar: Number,
  likes: [
    {
      email: String,
    },
  ],
  unlikes: [
    {
      email: String,
    },
  ],
  comments: [
    {
      name: String,
      content: String,
      avatar: Number,
      createdAt: {
        type: Date,
        default: new Date().toISOString(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = model("Post", Post);
