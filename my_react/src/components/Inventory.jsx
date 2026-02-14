import React, { useState } from "react";

function Inventory() {
  const [stock, setStock] = useState(0);

  const addStock = () => setStock(prev => prev + 1);
  const removeStock = () => {
    if (stock > 0) setStock(prev => prev - 1);
  };

  return (
    <div className="inventory-wrapper">
      {/* Internal CSS */}
      <style>{`
        .inventory-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .inventory-card {
          width: 320px;
          padding: 2rem;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
          border: 1px solid #f0f0f0;
        }

        h2 {
          color: #1a1a1a;
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }

        .stock-count {
          font-size: 3.5rem;
          font-weight: 800;
          color: #2563eb;
          margin: 1rem 0;
        }

        .label {
          color: #6b7280;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .button-container {
          display: flex;
          gap: 12px;
          margin-top: 2rem;
        }

        .btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-add {
          background-color: #2563eb;
          color: white;
        }

        .btn-add:hover {
          background-color: #1d4ed8;
          transform: translateY(-1px);
        }

        .btn-remove {
          background-color: #f3f4f6;
          color: #374151;
        }

        .btn-remove:hover:not(:disabled) {
          background-color: #e5e7eb;
          color: #dc2626;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .alert-box {
          margin-top: 1.5rem;
          padding: 10px;
          background-color: #fef2f2;
          color: #dc2626;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #fee2e2;
        }
      `}</style>

      <div className="inventory-card">
        <h2>Inventory Manager</h2>
        
        <p className="label">Available Units</p>
        <div className="stock-count">{stock}</div>

        <div className="button-container">
          <button className="btn btn-add" onClick={addStock}>
            Add Stock
          </button>

          <button 
            className="btn btn-remove" 
            onClick={removeStock} 
            disabled={stock === 0}
          >
            Remove
          </button>
        </div>

        {stock === 0 && (
          <div className="alert-box">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;