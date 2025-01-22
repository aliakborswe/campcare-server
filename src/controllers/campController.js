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
    const limit = parseInt(_req.query?.limit);
    const page = parseInt(_req.query?.page) || 1; // Default page to 1 if not provided
    const skip = (page - 1) * limit;
  try {
    const camps = await campModel
      .find()
      .sort({ createdAt: -1 }) // Sort by latest date
      .skip(skip)
      .limit(limit);
      if (!camps) {
        return res.status(404).json({ error: "Post not found" });
      }
    res.status(200).json(camps);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


