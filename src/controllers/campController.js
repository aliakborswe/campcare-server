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
