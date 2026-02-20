const db = require("../config/db");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, message: "product_id is required." });
    }

    const [product] = await db.execute(
      "SELECT id FROM products WHERE id = ? AND is_available = 1",
      [product_id]
    );
    if (product.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found or unavailable." });
    }

    const [existing] = await db.execute(
      "SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, product_id]
    );

    if (existing.length > 0) {
      const newQty = existing[0].quantity + (quantity || 1);
      await db.execute("UPDATE cart SET quantity = ? WHERE id = ?", [newQty, existing[0].id]);
      return res.json({ success: true, message: "Cart quantity updated." });
    }

    await db.execute(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [userId, product_id, quantity || 1]
    );

    res.status(201).json({ success: true, message: "Item added to cart." });
  } catch (error) {
    console.error("Add to Cart Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to add to cart.", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const [items] = await db.execute(
      `SELECT cart.id, cart.quantity,
              products.id AS product_id, products.name, products.price,
              products.category, products.type, products.image_url,
              (products.price * cart.quantity) AS subtotal
       FROM cart
       JOIN products ON cart.product_id = products.id
       WHERE cart.user_id = ?`,
      [userId]
    );

    const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

    res.json({ success: true, items, total: total.toFixed(2) });
  } catch (error) {
    console.error("Get Cart Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch cart.", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1." });
    }

    const [item] = await db.execute(
      "SELECT id FROM cart WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    if (item.length === 0) {
      return res.status(404).json({ success: false, message: "Cart item not found." });
    }

    await db.execute("UPDATE cart SET quantity = ? WHERE id = ?", [quantity, id]);
    res.json({ success: true, message: "Cart updated." });
  } catch (error) {
    console.error("Update Cart Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update cart.", error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const [item] = await db.execute(
      "SELECT id FROM cart WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    if (item.length === 0) {
      return res.status(404).json({ success: false, message: "Cart item not found." });
    }

    await db.execute("DELETE FROM cart WHERE id = ?", [id]);
    res.json({ success: true, message: "Item removed from cart." });
  } catch (error) {
    console.error("Remove Cart Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to remove item.", error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await db.execute("DELETE FROM cart WHERE user_id = ?", [req.user.id]);
    res.json({ success: true, message: "Cart cleared." });
  } catch (error) {
    console.error("Clear Cart Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to clear cart.", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
};