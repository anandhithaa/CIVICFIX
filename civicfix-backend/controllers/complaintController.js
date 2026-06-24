const Complaint = require("../models/Complaint");
const classifyComplaint = require("../utils/complaintClassifier");

// POST /api/complaints
const createComplaint = async (req, res) => {
  try {
    const { title, description, zone } = req.body;

    if (!title || !description || !zone) {
      return res.status(400).json({
        message: "Title, description and zone are required"
      });
    }

    const { category, priority, suggestedDepartment } =
      classifyComplaint(description, title);

    const complaint = await Complaint.create({
      userId: req.user._id,
      title,
      description,
      zone,
      category,
      priority,
      suggestedDepartment
    });

    res.status(201).json({
      message: "Complaint created successfully",
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/complaints/my
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user._id }).sort({
      createdAt: -1
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComplaint, getMyComplaints };