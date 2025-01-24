const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentModel = require("../models/PaymentModel");
const participantModel = require("../models/ParticipantModel");
const { populate } = require("dotenv");
const { model } = require("mongoose");

// get all Payment history by Email
// get all Payment history by Email
exports.getPaymentHistoryByEmail = async (req, res) => {
  const email = req.query.email;

  try {
    const payments = await paymentModel
      .find({ userEmail: email })
      .populate({
        path: "participantId",
        populate: {
          path: "campId", // Populate the campId field in the participant
          model: "camps", // Reference the Camp model
        },
      });

    const paymentHistory = payments.map((payment) => ({
      id: payment._id,
      campName: payment.participantId.campId.campName,
      campFees: payment.participantId.campId.campFees,
      paymentStatus: payment.participantId.paymentStatus,
      confirmationStatus: payment.participantId.confirmationStatus,
    }));

    res.status(200).json(paymentHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// Create Payment Intent
exports.paymentIntentFunc = async (req, res) => {
  const { amount, currency, } = req.body;

  if (!amount || !currency ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input data" });
  }

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    // console.log("PaymentIntent Created: ", paymentIntent);

    res.json(paymentIntent.client_secret );
  } catch (err) {
    console.error("Error creating PaymentIntent: ", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};




// Confirm Payment method: PATCH
exports.paymentConfirmationFunc = async (req, res) => {
  const { paymentIntentId, participantId, userEmail } = req.body;

  // Validate input data
  if (!paymentIntentId || !participantId || !userEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input data" });
  }

  // console.log("PaymentIntent Id from confirm Func: ", paymentIntentId);

  try {
    // Retrieve the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    // console.log("PaymentIntent Retrieved: ", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      // create payment history on db
      const paymentHistory = {
        userEmail,
        participantId,
        paymentIntentId
      }
      const history = await paymentModel.create(paymentHistory)
      if(!history){
        return res.status(304).json({ message: "Payment History not created" })
      }
      // Update the participant's payment status
      const updatedParticipant = await participantModel.findByIdAndUpdate(
        { _id: participantId },
        { paymentStatus: "Paid" }
      );

      if (!updatedParticipant) {
        return res
          .status(404)
          .json({ success: false, message: "Participant not found" });
      }

      // console.log("Participant Updated: ", updatedParticipant);
    }

    res.json({ success: true, paymentIntent });
  } catch (err) {
    console.error("Error confirming Payment: ", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
