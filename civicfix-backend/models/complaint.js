const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: [
        "Pothole",
        "Garbage Overflow",
        "Broken Streetlight",
        "Water Leakage",
        "Open Manhole",
        "Other"
      ],
      default: "Other"
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },
    suggestedDepartment: {
      type: String,
      default: "General Civic Department"
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending"
    },
    zone: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);