const db = require("../config/db");

const getMyNotifications = async (req, res) => {
  try {
    const [notifications] = await db.execute(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Get Notifications Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch notifications.", error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    await db.execute(
      "UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?",
      [req.params.id, req.user.id]
    );
    res.json({ success: true, message: "Notification marked as read." });
  } catch (error) {
    console.error("Mark Read Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update notification.", error: error.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await db.execute(
      "UPDATE notifications SET is_read = 1 WHERE user_id = ?",
      [req.user.id]
    );
    res.json({ success: true, message: "All notifications marked as read." });
  } catch (error) {
    console.error("Mark All Read Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update notifications.", error: error.message });
  }
};

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllAsRead
};