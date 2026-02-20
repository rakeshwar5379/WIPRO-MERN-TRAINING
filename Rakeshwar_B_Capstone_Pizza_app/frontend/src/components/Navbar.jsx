import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

const PLACEHOLDER = 'https://via.placeholder.com/40x40?text=P';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount, cartItems, cartTotal, refreshCart, clearCartCount } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user && !isAdmin) refreshCart();
  }, [user]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    logout();
    clearCartCount();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to={isAdmin ? '/admin' : '/menu'}>
          Pizza Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu">Menu</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-danger btn-sm" to="/register">Register</Link>
                </li>
              </>
            ) : isAdmin ? (
              <>
                
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu">Menu</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>

                <li className="nav-item position-relative" ref={dropdownRef}>
                  <button
                    className="btn btn-warning btn-sm position-relative"
                    onClick={() => setDropdownOpen(o => !o)}
                  >
                    Cart
                    {cartCount > 0 && (
                      <span
                        className="badge bg-danger rounded-pill position-absolute"
                        style={{ top: '-6px', right: '-8px', fontSize: '0.65rem' }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        right: 0,
                        width: '320px',
                        background: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid #eaeaea',
                        zIndex: 9999,
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                        <span className="fw-semibold small">Your Cart</span>
                        {cartCount > 0 && (
                          <span className="badge bg-danger">{cartCount}</span>
                        )}
                      </div>
                      {cartItems.length === 0 ? (
                        <div className="text-center py-3 px-2">
                          <p className="text-muted small mb-2">Cart is empty</p>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => { setDropdownOpen(false); navigate('/menu'); }}
                          >
                            Browse Menu
                          </button>
                        </div>
                      ) : (
                        <>
                          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                            {cartItems.map((item, idx) => (
                              <div
                                key={item.id}
                                className="d-flex align-items-center gap-2 px-3 py-2"
                                style={{
                                  borderBottom:
                                    idx < cartItems.length - 1 ? '1px solid #f5f5f5' : 'none',
                                }}
                              >
                                <img
                                  src={item.image_url || PLACEHOLDER}
                                  alt={item.name}
                                  onError={e => { e.target.src = PLACEHOLDER; }}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                  }}
                                />

                                <div className="flex-grow-1 overflow-hidden">
                                  <div className="fw-semibold text-truncate small">
                                    {item.name}
                                  </div>
                                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                    {item.quantity} × ₹{item.price}
                                  </div>
                                </div>

                                <div className="fw-semibold small">
                                  ₹{item.subtotal}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="px-3 py-2 border-top">
                            <div className="d-flex justify-content-between mb-2 small">
                              <span>Total</span>
                              <span className="fw-bold text-danger">
                                ₹{parseFloat(cartTotal).toFixed(2)}
                              </span>
                            </div>

                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-outline-dark btn-sm flex-fill"
                                onClick={() => { setDropdownOpen(false); navigate('/cart'); }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm flex-fill"
                                onClick={() => { setDropdownOpen(false); navigate('/checkout'); }}
                              >
                                Checkout
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
