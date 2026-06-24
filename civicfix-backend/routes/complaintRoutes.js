const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createComplaint,
  getMyComplaints
} = require("../controllers/complaintController");

router.post("/", authMiddleware, createComplaint);
router.get("/my", authMiddleware, getMyComplaints);

module.exports = router;