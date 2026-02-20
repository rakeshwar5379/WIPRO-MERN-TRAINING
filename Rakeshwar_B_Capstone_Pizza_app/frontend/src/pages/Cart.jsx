import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const PLACEHOLDER = "https://via.placeholder.com/80x80?text=Item";

export default function Cart() {
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setItems(res.data.items || []);
      setTotal(parseFloat(res.data.total) || 0);
    } catch {
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await api.put(`/cart/${id}`, { quantity: qty });
    fetchCart();
    refreshCart();
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
    refreshCart();
  };

  const clearCart = async () => {
    if (!window.confirm("Clear cart?")) return;
    await api.delete("/cart/clear");
    fetchCart();
    refreshCart();
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 10px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px", padding: "6px 12px" }}
      >
        ← Back
      </button>

      <h3 style={{ marginBottom: "20px" }}>Your Cart</h3>

      {items.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Your cart is empty.</p>
          <Link to="/menu" style={{ color: "#dc3545" }}>Browse Menu</Link>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            >
              <img
                src={item.image_url || PLACEHOLDER}
                alt={item.name}
                width="60"
                height="60"
                style={{ borderRadius: "6px", objectFit: "cover" }}
                onError={(e) => (e.target.src = PLACEHOLDER)}
              />

              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 4px 0", fontWeight: 600 }}>{item.name}</p>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>Price: ₹{item.price}</p>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Subtotal: ₹{item.subtotal}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  style={{ padding: "2px 8px" }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  style={{ padding: "2px 8px" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  marginLeft: "10px",
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  color: "#fff",
                  background: "#dc3545",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{ textAlign: "right", marginBottom: "12px" }}>
            <button
              onClick={clearCart}
              style={{
                padding: "6px 12px",
                background: "#6c757d",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>

          <p style={{ fontWeight: 600, textAlign: "right", fontSize: "1.05rem" }}>
            Total: ₹{total.toFixed(2)}
          </p>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              width: "100%",
              padding: "10px",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
