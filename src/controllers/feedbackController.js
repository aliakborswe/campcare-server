const feedbackModel = require("../models/FeedbackModel")

// POST: Submit Feedback
exports.createFeedback = async (req, res) => {
  const { userName, userEmail, feedback, rating } = req.body;

  try {
    if (!feedback || !rating) {
      return res
        .status(400)
        .json({ message: "Feedback and rating are required." });
    }

    const newFeedback = new feedbackModel({
      userName,
      userEmail,
      feedback,
      rating: Number(rating),
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit feedback.", error: error.message });
  }
};

// GET: Fetch All Feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch feedback.", error: error.message });
  }
};
