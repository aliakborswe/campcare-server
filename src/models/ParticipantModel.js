const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema(
  {
    campId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "camps",
    },
    participantName: {
      type: String,
      required: true,
      trim: true,
    },
    participantEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    confirmationStatus: {
      type: String,
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true, versionKey: false }
);

const Participant = mongoose.model("participants", ParticipantSchema);

module.exports = Participant;
