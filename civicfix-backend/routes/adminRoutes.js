const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getAllComplaints,
  updateComplaintStatus,
  getDashboardStats
} = require("../controllers/adminController");

router.get("/complaints", authMiddleware, adminMiddleware, getAllComplaints);
router.patch(
  "/complaints/:id/status",
  authMiddleware,
  adminMiddleware,
  updateComplaintStatus
);
router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

module.exports = router;