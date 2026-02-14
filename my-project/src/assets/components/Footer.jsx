import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-8 px-10">
      <div className="max-w-6xl bg-center grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 className="text-white text-xl font-bold mb-4">My Agro Mart</h4>
        </div>
      </div>
      <div>

        © 2026 AgroRoot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;