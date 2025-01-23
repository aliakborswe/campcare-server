const campModel = require("../models/CampModel");

// create a new camp
exports.createCamp = async (req, res) => {
  const camp = req.body;
  try {
    const newCamp = await campModel.create(camp);
    res.status(201).json(newCamp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all Camps
exports.getAllCamp = async (_req, res) => {
  try {
    const camps = await campModel
      .find()
      if (!camps) {
        return res.status(404).json({ error: "Camp not found" });
      }
    res.status(200).json(camps);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// get a camp by id
exports.getCampById = async (req, res) => {
  const { id } = req.params;
  try {
    const camp = await campModel.findById(id);
    if (!camp) {
      return res.status(404).json({ error: "Camp not found" });
    }
    res.status(200).json(camp);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }

}


// GET camp to retrieve top 6 camps with highest participant count
exports.getTop6Camps = async (_req, res) => {
  try {
    const camps = await campModel
      .find()
      .sort({ participantCount: -1 })
      .limit(6);
    res.status(200).json(camps);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
