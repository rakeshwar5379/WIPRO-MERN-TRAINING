const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderById,
  cancelOrder,
  getOrderBill
} = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, placeOrder);

router.get("/:id", verifyToken, getOrderById);

router.get("/:id/bill", verifyToken, getOrderBill);

router.put("/:id/cancel", verifyToken, cancelOrder);

module.exports = router;
