const { mongoose, Schema, Types } = require("mongoose");

const PaymentSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    participantId: {
      type: Types.ObjectId,
      ref: "participants",
      required: true,
    },
    paymentIntentId: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Payment = mongoose.model("payments", PaymentSchema);

module.exports = Payment;
