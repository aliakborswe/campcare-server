const participantModel = require("../models/ParticipantModel");
const campModel = require("../models/CampModel");

// TODO: Implement the controller logic for participant-related operations
// Create a new participant, ensuring they are not already registered for the same camp
exports.createNewParticipant = async (req, res) => {
  const { campId } = req.body;
  try{
    // Create a new participant
    const newParticipant = await participantModel.create(req.body);
    // Update the camp's participant count
    await campModel.findByIdAndUpdate(campId, { $inc: { participantCount: 1 } });
    res.status(201).json(newParticipant, { message: "Participant created successfully" });
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
        console.log(participants);
      res.status(200).json(participants);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
}