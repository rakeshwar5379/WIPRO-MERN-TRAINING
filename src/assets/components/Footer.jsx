import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 className="text-white text-xl font-bold mb-4">AgroRoot</h4>
          <p className="text-sm leading-relaxed">Connecting you with nature's best. We focus on sustainable farming and fair trade.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-emerald-400">Our Farmers</a></li>
            <li><a href="#" className="hover:text-emerald-400">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400">Bulk Orders</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Newsletter</h4>
          <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-l px-4 py-2 w-2/3 focus:ring-2 ring-emerald-500"/>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-r">Join</button>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs">
        © 2026 AgroRoot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;