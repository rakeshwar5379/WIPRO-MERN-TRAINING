import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '480px', borderRadius: '16px' }}>
        {/* Back Button */}
        <button
          className="btn btn-outline-secondary btn-sm mb-3 align-self-start"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-1" /> Back
        </button>

        <div className="text-center mb-4">
          <h4 className="fw-bold">Create Account</h4>
          <p className="text-muted small">Join us and order your favourite pizza!</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold">Full Name *</label>
              <input type="text" name="name" className="form-control" placeholder="Your Name"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Email *</label>
              <input type="email" name="email" className="form-control" placeholder="you@email.com"
                value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Password *</label>
              <input type="password" name="password" className="form-control" placeholder="Min. 6 characters"
                value={form.password} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Phone</label>
              <input type="tel" name="phone" className="form-control" placeholder="+91 98765 43210"
                value={form.phone} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Delivery Address</label>
              <textarea name="address" className="form-control" placeholder="Street, City, State"
                rows={2} value={form.address} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-danger w-100 py-2 mt-4" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-danger fw-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}