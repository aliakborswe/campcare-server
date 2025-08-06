const { mongoose, Schema } = require("mongoose");

const campSchema = new Schema(
  {
    campName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    campFees: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    healthcareProfessional: {
      type: String,
      required: true,
      trim: true,
    },
    participantCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Camp = mongoose.model("camps", campSchema);
module.exports = Camp;
