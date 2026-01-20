import React from 'react';

const Card = ({ name, price, category, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow group">
      <div className="h-40 bg-emerald-50 rounded-xl flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{category}</span>
      <h3 className="text-xl font-bold text-slate-800 mt-1">{name}</h3>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-slate-900">${price}</span>
        <button className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;