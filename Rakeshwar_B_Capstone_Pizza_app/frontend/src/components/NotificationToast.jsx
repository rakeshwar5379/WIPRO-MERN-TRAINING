import React, { useEffect, useState, useRef } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function NotificationToast() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const seenIds = useRef(new Set());

  useEffect(() => {
    if (!user) return;

    const poll = async () => {
      try {
        const res = await api.get('/notifications');
        const all = res.data.notifications || [];

        const fresh = all.filter(n => !seenIds.current.has(n.id));
        if (fresh.length > 0) {
          fresh.forEach(n => seenIds.current.add(n.id));
          const withTimestamp = fresh.map(n => ({ ...n, _toastId: Date.now() + n.id }));
          setNotifications(prev => [...prev, ...withTimestamp]);

          withTimestamp.forEach(n => {
            setTimeout(() => {
              setNotifications(prev => prev.filter(x => x._toastId !== n._toastId));
            }, 5000);
          });
        }
      } catch {
      }
    };

    poll(); 
    const interval = setInterval(poll, 10000);
    return () => clearInterval(interval);
  }, [user]);

  if (notifications.length === 0) return null;

  return (
    <div className="order-toast">
      {notifications.map(n => (
        <div
          key={n._toastId}
          className="toast show mb-2"
          style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '10px' }}
        >
          <div
            className="toast-header"
            style={{ background: '#dc3545', color: '#fff', borderRadius: '10px 10px 0 0' }}
          >
            <strong className="me-auto"> Order Update</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() =>
                setNotifications(prev => prev.filter(x => x._toastId !== n._toastId))
              }
            />
          </div>
          <div className="toast-body">{n.message}</div>
        </div>
      ))}
    </div>
  );
}