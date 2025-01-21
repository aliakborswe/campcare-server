const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: "string", required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user", // Default role for new users
    },
  },
  { timestamps: true, versionKey: false }
);

const user = mongoose.model("users", userSchema);
module.exports = user;
