const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cartController");
const { verifyToken, isUser } = require("../middleware/authMiddleware");
router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addToCart);
router.put("/:id", verifyToken, updateCartItem);
router.delete("/clear", verifyToken, clearCart);
router.delete("/:id", verifyToken, removeCartItem);

module.exports = router;