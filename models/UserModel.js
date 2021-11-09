const { model, Schema } = require("mongoose");

const User = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: {
    type: Number,
    default: Math.floor(Math.random() * 10),
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

module.exports = model("User", User);
