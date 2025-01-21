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
    contact: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
