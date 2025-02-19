const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      default: "anonymous",
    },
    userEmail: {
      type: String,
      required: true,
      default: "anonymous",
    },
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FeedbackModel = mongoose.model("feedbacks", feedbackSchema);

module.exports = FeedbackModel;
