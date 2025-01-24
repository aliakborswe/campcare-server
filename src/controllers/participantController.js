const participantModel = require("../models/ParticipantModel");
const campModel = require("../models/CampModel");

// Create a new participant, ensuring they are not already registered for the same camp
exports.createNewParticipant = async (req, res) => {
  const { campId } = req.body;
  try {
    // Check if the participant is already registered for the same camp
    const isParticipantRegistered = await participantModel.exists({
      campId,
      participantEmail: req.user.email,
    });
    if (isParticipantRegistered) {
      return res
        .status(400)
        .json({ message: "Participant is already registered for this camp" });
    }
    // Create a new participant
    const newParticipant = await participantModel.create(req.body);
    // Update the camp's participant count
    await campModel.findByIdAndUpdate(campId, {
      $inc: { participantCount: +1 },
    });
    res.status(201).json({
      message: "Participant created successfully",
      participant: newParticipant,
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Get all participants with camp details
exports.getAllParticipant = async (_req, res) => {
  try {
    const participants = await participantModel.find().populate("campId");
    res.status(200).json(participants);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Get all  participants by email with camp details
exports.getAllParticipantByEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const participants = await participantModel
      .find({ participantEmail: email })
      .populate("campId");
    res.status(200).json(participants);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
// Get participant by ID with camp fees details
exports.getParticipantById = async (req, res) => {
  const participantId = req.params.participantId;
  try {
    const participant = await participantModel
      .findOne({ _id: participantId })
      .populate("campId", "campFees"); // Populate only the campFees field

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    const campFees = participant.campId?.campFees;
    res.status(200).json({ campFees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete participant by id
exports.deleteParticipantById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedParticipant = await participantModel.findByIdAndDelete(id);
    if (!deletedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    res.status(200).json({ message: "Participant deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// get all Participant length
exports.getParticipantLength = async (_req, res) => {
  try {
    const participants = await participantModel.countDocuments();
    res.status(200).json(participants);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// update confirmationStatus by id
exports.updateConfirmationStatusById = async (req, res) => {
  const id = req.params.id;
  const { confirmationStatus } = req.body;

  try {
    const updatedParticipant = await participantModel.findByIdAndUpdate(id, {
      confirmationStatus,
    });

    if (!updatedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json({
      message: "Confirmation status updated successfully",
      participant: updatedParticipant,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
