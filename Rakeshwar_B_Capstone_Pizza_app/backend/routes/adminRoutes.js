const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  generateBill,
  getMonthlyRevenue,
  getAllUsers,
  sendMessageToUser
} = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
router.get("/orders", verifyToken, isAdmin, getAllOrders);
router.put("/orders/:id/status", verifyToken, isAdmin, updateOrderStatus);
router.get("/orders/:id/bill", verifyToken, isAdmin, generateBill);
router.get("/revenue", verifyToken, isAdmin, getMonthlyRevenue);
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.post("/message", verifyToken, isAdmin, sendMessageToUser);


module.exports = router;