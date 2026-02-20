import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data.orders || []);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto' }}>

      {orders.length === 0 ? (
        <div style={{ marginTop: '30px' }}>
          <p>No orders yet.</p>
          <Link to="/menu">Order Now</Link>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '15px',
              }}
            >
              <p>
                <strong>Order #{order.id}</strong>
              </p>

              <p>
                {new Date(order.created_at).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong>{' '}
                {order.status?.replace('_', ' ')}
              </p>

              <p>
                <strong>Payment:</strong> {order.payment_mode}
              </p>

              <p>
                <strong>Delivery:</strong> {order.delivery_mode}
              </p>

              <p>
                <strong>Items:</strong> {order.items?.length || 0}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.total_amount}
              </p>

              <div style={{ marginTop: '10px' }}>
                <Link to={`/orders/${order.id}`} style={{ marginRight: '10px' }}>
                  View Details
                </Link>

                <Link to={`/orders/${order.id}`}>
                  Bill
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
