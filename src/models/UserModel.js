const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  photoURL: { type: "string" },
  password: { type: "string" },
  lastLogin: { type: Date, default: Date.now() },
});

const user = mongoose.model("users", userSchema);
module.exports = user;
