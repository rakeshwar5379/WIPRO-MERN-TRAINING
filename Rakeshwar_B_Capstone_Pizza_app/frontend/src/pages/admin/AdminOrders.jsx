import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { AdminSidebar } from './AdminDashboard';

const STATUSES = ['pending', 'accepted', 'preparing', 'on_the_way', 'delivered', 'cancelled'];

const STATUS_COLORS = {
  pending: '',
  accepted: '',
  preparing: '',
  on_the_way: '',
  delivered: '',
  cancelled: '',
};

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [bill, setBill] = useState(null);
  const [billLoading, setBillLoading] = useState(false);

  useEffect(() => {
    api.get('/admin/orders')
      .then(res => setOrders(res.data.orders || []))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId, status) => {
    setUpdating(prev => ({ ...prev, [orderId]: true }));
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status } : o)
      );
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const viewBill = async (orderId) => {
    setBillLoading(true);
    setBill(null);
    try {
      const res = await api.get(`/admin/orders/${orderId}/bill`);
      setBill(res.data.bill);
    } catch {
      alert('Could not load bill');
    } finally {
      setBillLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4">

        <button
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <h4 className="mb-3">All Orders</h4>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="card">
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Bill</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer_name || order.user_id}</td>
                      <td>₹{order.total_amount}</td>
                      <td className="text-capitalize">{order.payment_mode}</td>
                      <td className="text-capitalize">{order.delivery_mode}</td>
                      <td>
                        <span className={`badge bg-${STATUS_COLORS[order.status] || 'secondary'}`}>
                          {order.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value)}
                          disabled={
                            updating[order.id] || order.status === 'cancelled'
                          }
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>
                              {s.replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => viewBill(order.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(bill || billLoading) && (
          <div
            className="modal show d-block"
            style={{ background: 'rgba(0,0,0,0.3)' }}
            onClick={() => setBill(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order Bill</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setBill(null)}
                  />
                </div>

                <div className="modal-body">
                  {billLoading ? (
                    <p>Loading...</p>
                  ) : bill && (
                    <>
                      <div className="mb-2">
                        <strong>Customer:</strong> {bill.customer_name}<br />
                        <strong>Email:</strong> {bill.email}<br />
                        <strong>Phone:</strong> {bill.phone}<br />
                        <strong>Address:</strong> {bill.address}
                      </div>

                      <table className="table table-sm table-bordered">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bill.items?.map((item, i) => (
                            <tr key={i}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>₹{item.price}</td>
                              <td>₹{item.subtotal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span>₹{bill.subtotal}</span>
                      </div>

                      <div className="d-flex justify-content-between fw-bold">
                        <span>Grand Total</span>
                        <span>₹{bill.grand_total}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
