const db = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const { category, type, search } = req.query;

    let query = "SELECT * FROM products WHERE is_available = 1";
    const params = [];

    if (category) { query += " AND category = ?"; params.push(category); }
    if (type)     { query += " AND type = ?";     params.push(type); }
    if (search)   {
      query += " AND (name LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY category, name";

    const [products] = await db.execute(query, params);
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("Get Products Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch products.", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, product: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch product.", error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categories = ["pizza", "sides", "beverages", "combo", "new_launches", "bestsellers"];
    const result = {};
    for (const cat of categories) {
      const [rows] = await db.execute(
        "SELECT * FROM products WHERE category = ? AND is_available = 1", [cat]
      );
      result[cat] = rows;
    }
    res.json({ success: true, menu: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch menu.", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, type, image_url } = req.body;

    if (!name || !price || !category || !type) {
      return res.status(400).json({ success: false, message: "Name, price, category and type are required." });
    }

    await db.execute(
      "INSERT INTO products (name, description, price, category, type, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description || null, price, category, type, image_url || null]
    );

    res.status(201).json({ success: true, message: "Product added successfully." });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to add product.", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, type, image_url, is_available } = req.body;

    const [existing] = await db.execute("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    await db.execute(
      `UPDATE products SET name=?, description=?, price=?, category=?, type=?, image_url=?, is_available=? WHERE id=?`,
      [name, description || null, price, category, type, image_url || null,
       is_available !== undefined ? is_available : 1, id]
    );

    res.json({ success: true, message: "Product updated successfully." });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update product.", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.execute("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    await db.execute("DELETE FROM products WHERE id = ?", [id]);
    res.json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete product.", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct
};