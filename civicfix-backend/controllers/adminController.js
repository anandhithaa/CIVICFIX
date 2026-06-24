const Complaint = require("../models/Complaint");

// GET /api/admin/complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/admin/complaints/:id/status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ["Pending", "In Progress", "Resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      total,
      pending,
      inProgress,
      resolved,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllComplaints,
  updateComplaintStatus,
  getDashboardStats
};