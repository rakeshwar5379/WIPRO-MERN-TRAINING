import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['all', 'pizza', 'sides', 'beverages', 'combo', 'new_launches', 'bestsellers'];
const TYPES = ['all', 'veg', 'non-veg'];

function ProductCard({ product, onAdd, isAdding }) {
  return (
    <div className="card h-100 shadow-sm">
      <div
        className="product-image-wrapper"
        style={{
          height: '180px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa'
        }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              maxHeight: '100%',
              width: 'auto',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div className="text-center p-4">No Image</div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.name}</h6>

        <p className="text-muted small mb-2">
          {product.description || 'Fresh item available'}
        </p>

        <p className="mb-1">
          <strong>Type:</strong> {product.type}
        </p>

        <p className="mb-2">
          <strong>Category:</strong> {product.category?.replace('_', ' ')}
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{product.price}</span>

          <button
            className="btn btn-sm btn-primary"
            onClick={() => onAdd(product.id, product.name)}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const { user } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState({});
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'all') params.category = category;
      if (type !== 'all') params.type = type;
      if (search.trim()) params.search = search.trim();

      const res = await api.get('/products', { params });
      setProducts(res.data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchProducts, 300);
    return () => clearTimeout(delay);
  }, [category, type, search]);

  const showToast = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(''), 2000);
  };

  const addToCart = async (productId, productName) => {
    if (!user) {
      showToast('Please login to add items', 'warning');
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    setAdding(prev => ({ ...prev, [productId]: true }));

    try {
      await api.post('/cart', {
        product_id: productId,
        quantity: 1
      });

      refreshCart();
      showToast(`${productName} added to cart`);
    } catch {
      showToast('Could not add to cart', 'danger');
    } finally {
      setAdding(prev => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="container py-4">

      <h3 className="mb-4">Menu</h3>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all'
                ? 'All'
                : cat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
              }
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {TYPES.map(t => (
            <option key={t} value={t}>
              {t.replace(/\b\w/g, c => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center">No products found</div>
      ) : (
        <div className="row g-3">
          {products.map(p => (
            <div key={p.id} className="col-12 col-md-4 col-lg-3">
              <ProductCard
                product={p}
                onAdd={addToCart}
                isAdding={!!adding[p.id]}
              />
            </div>
          ))}
        </div>
      )}

      {toastMsg && (
        <div className={`alert alert-${toastType} mt-3`}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
