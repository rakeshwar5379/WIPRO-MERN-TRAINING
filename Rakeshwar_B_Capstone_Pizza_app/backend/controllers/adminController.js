const db = require("../config/db");

const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;

    let query = `
      SELECT o.*, u.name AS customer_name, u.email, u.phone
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `;
    const params = [];

    if (status) {
      query += " WHERE o.status = ?";
      params.push(status);
    }

    query += " ORDER BY o.created_at DESC";

    const [orders] = await db.execute(query, params);

    for (const order of orders) {
      const [items] = await db.execute(
        `SELECT oi.quantity, oi.price, p.name
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, total: orders.length, orders });
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;

    const validStatuses = ["accepted", "rejected", "preparing", "out_for_delivery", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(", ")}`
      });
    }

    const [order] = await db.execute("SELECT * FROM orders WHERE id = ?", [id]);
    if (order.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    await db.execute(
      "UPDATE orders SET status = ?, message = ? WHERE id = ?",
      [status, message || null, id]
    );

    const userId = order[0].user_id;
    const notifMsg = message ? message : `Your order #${id} has been ${status}.`;

    await db.execute(
      "INSERT INTO notifications (user_id, order_id, message) VALUES (?, ?, ?)",
      [userId, id, notifMsg]
    );

    req.io.to(`user_${userId}`).emit("orderUpdate", {
      orderId: id,
      status,
      message: notifMsg
    });

    res.json({ success: true, message: `Order #${id} marked as '${status}'.` });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ success: false, message: "Failed to update order status." });
  }
};

const generateBill = async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await db.execute(
      `SELECT o.*, u.name AS customer_name, u.email, u.phone, u.address
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    const order = orders[0];

    const [items] = await db.execute(
      `SELECT p.name, p.category, oi.quantity, oi.price,
              (oi.quantity * oi.price) AS subtotal
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    const grandTotal = parseFloat(order.total_amount);

    res.json({
      success: true,
      bill: {
        order_id: order.id,
        customer_name: order.customer_name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        items,
        subtotal: order.total_amount,
        grand_total: grandTotal,
        payment_mode: order.payment_mode,
        delivery_mode: order.delivery_mode,
        status: order.status,
        order_date: order.created_at
      }
    });
  } catch (error) {
    console.error("Generate Bill Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate bill." });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const [result] = await db.execute(`
      SELECT
        YEAR(created_at)      AS year,
        MONTH(created_at)     AS month,
        MONTHNAME(created_at) AS month_name,
        COUNT(id)             AS order_count,
        SUM(total_amount)     AS total
      FROM orders
      WHERE status = 'delivered'
      GROUP BY YEAR(created_at), MONTH(created_at), MONTHNAME(created_at)
      ORDER BY year DESC, month DESC
    `);

    res.json({ success: true, revenue: result });
  } catch (error) {
    console.error("Monthly Revenue Error:", error);
    res.status(500).json({ success: false, message: "Revenue calculation failed." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT id, name, email, role, phone, created_at FROM users WHERE role = 'user' ORDER BY created_at DESC"
    );
    res.json({ success: true, total: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
};

const sendMessageToUser = async (req, res) => {
  try {
    const { user_id, message, order_id } = req.body;

    if (!user_id || !message) {
      return res.status(400).json({
        success: false,
        message: "user_id and message are required."
      });
    }

    await db.execute(
      "INSERT INTO notifications (user_id, order_id, message) VALUES (?, ?, ?)",
      [user_id, order_id || null, message]
    );

    req.io.to(`user_${user_id}`).emit("adminMessage", { message });

    res.json({ success: true, message: "Message sent to user." });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  generateBill,
  getMonthlyRevenue,
  getAllUsers,
  sendMessageToUser
};