import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export function AdminSidebar() {
  const loc = useLocation();
  const links = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/orders', label: 'Orders' },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/users', label: 'Users' },
  ];

  return (
    <div className="admin-sidebar d-flex flex-column py-4">
      <div className="px-4 mb-4">
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Admin</span>
      </div>
      {links.map(l => (
        <Link key={l.to} to={l.to} className={loc.pathname === l.to ? 'active' : ''}>
          <i className={`bi ${l.icon}`} /> {l.label}
        </Link>
      ))}
    </div>
  );
}
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const [revRes, ordRes] = await Promise.all([
        api.get('/admin/revenue'),
        api.get('/admin/orders')
      ]);

      console.log('Revenue API:', revRes.data);
      console.log('Orders API:', ordRes.data);

      const revenueData = revRes.data.revenue || revRes.data.data || revRes.data || [];
      const ordersData = ordRes.data.orders || ordRes.data.data || ordRes.data || [];

      setRevenue(revenueData);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setRevenue([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  const totalRevenue = revenue.reduce((sum, r) => sum + parseFloat(r.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4">
        
        <button
          className="btn btn-outline-secondary btn-sm mb-4"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-1" /> Back
        </button>

        <h4 className="fw-bold mb-4">Dashboard</h4>

        {loading ? (
          <div className="spinner-overlay">
            <div className="spinner-border text-danger" />
          </div>
        ) : (
          <>
            <div className="row g-4 mb-5">
              {[
                { label: 'Total Revenue', value: `₹${isNaN(totalRevenue) ? 0 : totalRevenue.toFixed(2)}`, color: '#198888' },
                { label: 'Total Orders', value: totalOrders, color: '#198888' },
                { label: 'Pending', value: pendingOrders, color: '#198888' },
                { label: 'Delivered', value: deliveredOrders, color: '#198888' },
              ].map(stat => (
                <div className="col-6 col-md-3" key={stat.label}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                      <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
                      <div className="fw-bold fs-4 mt-1" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-muted small">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Monthly Revenue</h6>
                {revenue.length === 0 ? (
                  <p className="text-muted">No revenue data yet.</p>
                ) : (
                  <table className="table table-sm table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Month</th>
                        <th>Orders</th>
                        <th className="text-end">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenue.map((r, i) => {
                        const total = parseFloat(r.total || 0);
                        const monthLabel = r.month ? monthNames[r.month - 1] : r.month_year || 'N/A';
                        return (
                          <tr key={i}>
                            <td>{monthLabel}</td>
                            <td>{r.order_count || 0}</td>
                            <td className="text-end fw-semibold text-success">
                              ₹{isNaN(total) ? 0 : total.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
