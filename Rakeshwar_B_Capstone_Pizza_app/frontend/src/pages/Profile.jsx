import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { login, user: authUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setProfile(res.data.user);
        setForm({
          name: res.data.user.name || "",
          phone: res.data.user.phone || "",
          address: res.data.user.address || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await api.put("/auth/profile", form);
      login({ ...authUser, name: form.name }, localStorage.getItem("token"));
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "50px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <button
          className="btn btn-outline-secondary btn-sm mb-3 align-self-start"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-1" /> Back
        </button>

      <h3 style={{ marginBottom: "15px" }}>Profile</h3>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "#f9f9f9",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        <p><strong>Name:</strong> {profile?.name}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Role:</strong> {profile?.role}</p>
      </div>

      <h4 style={{ marginBottom: "10px" }}>Edit Profile</h4>

      {message && (
        <div
          style={{
            marginBottom: "15px",
            padding: "8px",
            borderRadius: "4px",
            background: message.includes("success") ? "#e6f4ea" : "#fdecea",
            color: message.includes("success") ? "green" : "red",
            fontSize: "14px",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={{ marginBottom: "15px" }}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            background: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
