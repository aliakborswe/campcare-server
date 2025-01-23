const participantModel = require("../models/ParticipantModel");
const campModel = require("../models/CampModel");

// TODO: Implement the controller logic for participant-related operations
// Create a new participant, ensuring they are not already registered for the same camp
exports.createNewParticipant = async (req, res) => {
  const { campId } = req.body;
  try{
      // Check if the participant is already registered for the same camp
    const isParticipantRegistered = await participantModel.exists({ campId, participantEmail: req.user.email });
    if (isParticipantRegistered) {
      return res.status(400).json({ message: "Participant is already registered for this camp" });
    }
    // Create a new participant
    const newParticipant = await participantModel.create(req.body);
    // Update the camp's participant count
    await campModel.findByIdAndUpdate(campId, { $inc: { participantCount: +1 } });
    res.status(201).json({ message: "Participant created successfully" , participant: newParticipant });
  }
  catch (err) {
    res.status(404).json({ error: err.message });
  }
};


// Get all  participants by email with camp details
exports.getAllParticipantByEmail = async (req, res)=>{
    const email = req.query.email;
    try {
      const participants = await participantModel
        .find({ participantEmail: email })
        .populate("campId");
      res.status(200).json(participants);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
}

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
