const express = require("express");
const router = express.Router();
const {
  getMyNotifications,
  markAsRead,
  markAllAsRead
} = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/authMiddleware");

// GET  /api/notifications           - get all notifications for logged-in user
router.get("/", verifyToken, getMyNotifications);

// PUT  /api/notifications/read-all  - mark all as read
router.put("/read-all", verifyToken, markAllAsRead);

// PUT  /api/notifications/:id       - mark single notification as read
router.put("/:id", verifyToken, markAsRead);

module.exports = router;