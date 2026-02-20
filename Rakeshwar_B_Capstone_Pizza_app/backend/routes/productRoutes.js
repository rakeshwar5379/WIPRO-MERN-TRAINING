const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts);

router.get("/menu", getProductsByCategory);

router.get("/:id", getProductById);
router.post("/", verifyToken, isAdmin, addProduct);

router.put("/:id", verifyToken, isAdmin, updateProduct);

router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;