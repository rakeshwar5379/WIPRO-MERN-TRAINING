import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const STATUS_COLORS = {
  pending:    '',
  accepted:   '',
  preparing:  '',
  on_the_way: '',
  delivered:  '',
  cancelled:  '',
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [view, setView] = useState('details');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [orderRes, billRes] = await Promise.all([
          api.get(`/orders/${id}`),
          api.get(`/orders/${id}/bill`),
        ]);
        setOrder(orderRes.data.order);
        setBill(billRes.data.bill);
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  const cancelOrder = async () => {
    if (!window.confirm('Cancel this order?')) return;
    setCancelling(true);
    try {
      await api.put(`/orders/${id}/cancel`);
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot cancel order');
      setCancelling(false);
    }
  };

  if (loading) return (
    <div className="spinner-overlay">
      <div className="spinner-border text-danger" />
    </div>
  );

  if (!order) return (
    <div className="container py-4 text-center text-muted">Order not found.</div>
  );

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
    
      <button
        className="btn btn-outline-secondary btn-sm mb-4"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-1" /> Back
      </button>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Order #{order.id}</h4>
        <span className={`badge fs-6 px-3 py-2 ${STATUS_COLORS[order.status] || 'bg-secondary'}`}>
          {order.status?.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'details' ? 'active' : ''}`}
            onClick={() => setView('details')}
          >
            Order Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'bill' ? 'active' : ''}`}
            onClick={() => setView('bill')}
          >
            Bill
          </button>
        </li>
      </ul>

      {view === 'details' && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-6">
                <div className="text-muted small">Payment Mode</div>
                <div className="fw-semibold text-capitalize">{order.payment_mode}</div>
              </div>
              <div className="col-6">
                <div className="text-muted small">Delivery Mode</div>
                <div className="fw-semibold text-capitalize">{order.delivery_mode}</div>
              </div>
            </div>

            <h6 className="fw-bold mt-3 mb-2">Items Ordered</h6>
            <table className="table table-sm">
              <thead className="table-light">
                <tr>
                  <th>Item</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">₹{item.price}</td>
                    <td className="text-end">₹{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-end fw-bold">Total</td>
                  <td className="text-end fw-bold text-danger">₹{order.total_amount}</td>
                </tr>
              </tfoot>
            </table>

            {['pending', 'accepted'].includes(order.status) && (
              <button
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={cancelOrder}
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            )}
          </div>
        </div>
      )}

      {view === 'bill' && bill && (
        <div className="bill-box shadow-sm">
          <div className="text-center mb-4">
            <h5 className="fw-bold">Pizza Store</h5>
          </div>
          <hr />
          <div className="row mb-3">
            <div className="col-6">
              <div className="text-muted small">Customer</div>
              <div className="fw-semibold">{bill.customer_name}</div>
              <div className="small">{bill.email}</div>
              <div className="small">{bill.phone}</div>
            </div>
            <div className="col-6 text-end">
              <div className="text-muted small">Order #</div>
              <div className="fw-semibold">{bill.order_id}</div>
              <div className="small">{new Date(bill.order_date).toLocaleDateString()}</div>
            </div>
          </div>
          <table className="table table-sm mb-0">
            <thead className="table-dark">
              <tr><th>Item</th><th>Qty</th><th>Price</th><th className="text-end">Total</th></tr>
            </thead>
            <tbody>
              {bill.items?.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td className="text-end">₹{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div className="d-flex justify-content-between">
            <span className="text-muted">Subtotal</span><span>₹{bill.subtotal}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Grand Total</span>
            <span className="text-danger">₹{bill.grand_total}</span>
          </div>
          <div className="text-center mt-4 text-muted small">Thank you for your order! </div>
        </div>
      )}
    </div>
  );
}