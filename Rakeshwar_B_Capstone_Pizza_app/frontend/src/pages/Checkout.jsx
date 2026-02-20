import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCartCount, refreshCart } = useCart();

  const [form, setForm] = useState({
    payment_mode: "cash",
    delivery_mode: "delivery",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartLoading, setCartLoading] = useState(true);
  const [localItems, setLocalItems] = useState([]);
  const [localTotal, setLocalTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        const items = res.data.items || [];
        setLocalItems(items);
        setLocalTotal(
          items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );
      } catch (err) {
        console.error("Cart fetch error:", err);
        setLocalItems([]);
        setLocalTotal(0);
      } finally {
        setCartLoading(false);
      }
    };
    fetchCart();
  }, []);

  const placeOrder = async () => {
    setError("");

    if (localItems.length === 0) {
      setError("Your cart is empty. Add items first.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/orders", {
        payment_mode: form.payment_mode,
        delivery_mode: form.delivery_mode,
      });

      console.log("Backend Response:", res.data);
      if (res.data.success) {
        clearCartCount();
        await refreshCart();
        navigate(`/orders/${res.data.orderId}`);
      } else {
        setError(res.data.message || "Order failed.");
      }
    } catch (err) {
      console.error("Place Order Error:", err);
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading)
    return <p style={{ padding: 20, textAlign: "center" }}>Loading cart...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <button
        className="btn btn-outline-secondary btn-sm mb-4"
        onClick={() => navigate(-1)}
      >
         Back
      </button>

      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

      {error && (
        <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
      )}

      {localItems.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/menu")}
          >
            Go to Menu
          </button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <label>Payment Mode</label>
            <select
              value={form.payment_mode}
              onChange={(e) =>
                setForm({ ...form, payment_mode: e.target.value })
              }
              className="form-select mt-2"
            >
              <option value="cash">Cash</option>
              <option value="online">Online</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Delivery Mode</label>
            <select
              value={form.delivery_mode}
              onChange={(e) =>
                setForm({ ...form, delivery_mode: e.target.value })
              }
              className="form-select mt-2"
            >
              <option value="delivery">Home Delivery</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>

          <hr />

          <div style={{ marginTop: "20px" }}>
            <h3>Order Summary</h3>
            {localItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between"
                style={{ marginBottom: "8px" }}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹{localTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="btn btn-danger w-100 mt-3"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
