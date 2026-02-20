const db = require("../config/db");

const PAYMENT_MODES = ["cash", "online", "card"];
const DELIVERY_MODES = ["delivery", "pickup"];

exports.placeOrder = async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const userId = req.user.id;
    let { payment_mode, delivery_mode } = req.body;

    if (!payment_mode || !delivery_mode) {
      return res.status(400).json({
        success: false,
        message: "payment_mode and delivery_mode are required."
      });
    }
    if (!PAYMENT_MODES.includes(payment_mode)) payment_mode = "cash";
    if (!DELIVERY_MODES.includes(delivery_mode)) delivery_mode = "delivery";

    payment_mode = payment_mode.substring(0, 20);
    delivery_mode = delivery_mode.substring(0, 20);

    const [cartItems] = await connection.execute(
      `SELECT cart.product_id, cart.quantity, products.price, products.name
       FROM cart
       JOIN products ON cart.product_id = products.id
       WHERE cart.user_id = ?`,
      [userId]
    );

    if (cartItems.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ success: false, message: "Your cart is empty." });
    }
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [orderResult] = await connection.execute(
      `INSERT INTO orders (user_id, total_amount, status, payment_mode, delivery_mode)
       VALUES (?, ?, 'pending', ?, ?)`,
      [userId, total.toFixed(2), payment_mode, delivery_mode]
    );

    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await connection.execute(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await connection.execute("DELETE FROM cart WHERE user_id = ?", [userId]);

    await connection.execute(
      `INSERT INTO notifications (user_id, order_id, message)
       VALUES (?, ?, ?)`,
      [userId, orderId, `Your order #${orderId} has been placed successfully and is pending confirmation.`]
    );

    await connection.commit();

    req.io.to(`user_${userId}`).emit("orderUpdate", {
      orderId,
      status: "pending",
      message: `Order #${orderId} placed! Waiting for confirmation.`
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      orderId,
      total_amount: total.toFixed(2)
    });
  } catch (error) {
    await connection.rollback();
    console.error("Place Order Error:", error);
    res.status(500).json({ success: false, message: "Order placement failed." });
  } finally {
    connection.release();
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.*, u.name AS customer_name, u.email, u.phone
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ? AND o.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    const order = orders[0];

    const [items] = await db.execute(
      `SELECT oi.quantity, oi.price, p.name, p.category,
              (oi.quantity * oi.price) AS subtotal
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id]
    );

    order.items = items;

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch order." });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [order] = await db.execute(
      "SELECT * FROM orders WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (order.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (!["pending", "accepted"].includes(order[0].status)) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage."
      });
    }

    await db.execute(
      "UPDATE orders SET status='cancelled' WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    await db.execute(
      "INSERT INTO notifications (user_id, order_id, message) VALUES (?, ?, ?)",
      [userId, id, `Your order #${id} has been cancelled.`]
    );

    req.io.to(`user_${userId}`).emit("orderUpdate", {
      orderId: id,
      status: "cancelled",
      message: `Order #${id} has been cancelled.`
    });

    res.json({ success: true, message: "Order cancelled successfully." });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ success: false, message: "Cancellation failed." });
  }
};
exports.getOrderBill = async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.*, u.name AS customer_name, u.email, u.phone, u.address
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ? AND o.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    const order = orders[0];

    const [items] = await db.execute(
      `SELECT p.name, oi.quantity, oi.price, (oi.quantity * oi.price) AS subtotal
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id]
    );

    const grandTotal = (parseFloat(order.total_amount));

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
    console.error("Bill Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate bill." });
  }
};
