const { mongoose, Schema, Types } = require("mongoose");

const ParticipantSchema = new Schema(
  {
    participantName: {
      type: String,
      required: true,
      trim: true,
    },
    participantEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    campId: {
      type: Types.ObjectId,
      ref: "camps",
      required: true,
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
