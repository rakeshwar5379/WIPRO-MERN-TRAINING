import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AdminSidebar } from "./AdminDashboard";

const EMPTY = {
  name: "",
  description: "",
  price: "",
  category: "pizza",
  type: "veg",
  image_url: "",
  is_available: 1,
};

const CATEGORIES = [
  "pizza",
  "sides",
  "beverages",
  "combo",
  "new_launches",
  "bestsellers",
];

export default function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setShowForm(true);
    setMsg("");
  };

  const openEdit = (p) => {
    setEditing(p.id);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      category: p.category,
      type: p.type,
      image_url: p.image_url || "",
      is_available: p.is_available,
    });
    setShowForm(true);
    setMsg("");
  };
const handleSave = async (e) => {
  e.preventDefault();
  setSaving(true);
  setMsg("");

  console.log("Editing ID:", editing);  
  console.log("Form data:", form);      
  try {
    if (editing) {
      await api.put(`/products/${editing}`, form);
      setMsg("Product updated successfully");
    } else {
      await api.post("/products", form);
      setMsg("Product added successfully");
    }

    fetchProducts();
    setShowForm(false);
    setEditing(null);
  } catch (err) {
    console.log("Full error:", err.response);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    setMsg(err.response?.data?.message || err.response?.data?.error || JSON.stringify(err.response?.data) || "Failed to save");
  } finally {
    setSaving(false);
  }
};

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "20px", width: "100%" }}><button
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <h2>Products</h2>

        <button 
          className="btn btn-outline-secondary btn-sm mb-3" onClick={openAdd}>Add Product</button>

        {msg && <p>{msg}</p>}

        {showForm && (
          <form onSubmit={handleSave} style={{ marginTop: "20px" }}>
            <div>
              <label>Name *</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label>Price *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label>Category *</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Type *</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option className="btn btn-outline-secondary btn-sm mb-3" value="veg">Veg</option>
                <option className="btn btn-outline-secondary btn-sm mb-3" value="non-veg">Non-Veg</option>
              </select>
            </div>

            <div>
              <label>Available</label>
              <select
                value={form.is_available}
                onChange={(e) =>
                  setForm({
                    ...form,
                    is_available: parseInt(e.target.value),
                  })
                }
              >
                <option className="btn btn-outline-secondary btn-sm mb-3" value={1}>Yes</option>
                <option className="btn btn-outline-secondary btn-sm mb-3" value={0}>No</option>
              </select>
            </div>

            <div>
              <label>Image URL</label>
              <input
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div style={{ marginTop: "10px" }}>
              <button className="btn btn-outline-secondary btn-sm mb-3" type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editing
                  ? "Update"
                  : "Add Product"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm mb-3"
                onClick={() => setShowForm(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{ marginTop: "20px", width: "100%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.type}</td>
                  <td>₹{p.price}</td>
                  <td>{p.is_available ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-outline-secondary btn-sm mb-3" onClick={() => openEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm mb-3"
                      onClick={() => deleteProduct(p.id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
