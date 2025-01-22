const participantModel = require("../models/ParticipantModel");

// create a new participant by email at one time 
exports.createNewParticipant = async (req, res) => {
  const { participantEmail, campId } = req.body;

  try {
    // Check if participant already exists
    const existingParticipant = await participantModel.findOne({ participantEmail, campId });
    if (existingParticipant) {
      return res.status(400).json({ message: "Participant already registered for this camp." });
    }

    // Create new participant
    const participant = await participantModel.create(req.body);

    res.status(201).json({ message: "Participant registered successfully.", participant });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};