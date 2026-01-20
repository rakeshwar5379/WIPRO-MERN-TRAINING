import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
        <span className="text-3xl"></span> My Agro Mart
      </div>
      <div className="hidden md:flex space-x-8 font-medium text-slate-600">
        <a href="#" className="hover:text-emerald-200 transition">Home</a>
        <a href="#" className="hover:text-emerald-200 transition">Products</a>
        <a href="#" className="hover:text-emerald-200 transition">Contact</a>
      </div>
      <button className="bg-emerald-500 text-black px-6 py-4 rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-green-500 active:bg-violet-700 ">
        Shop Now
      </button>
    </nav>
  );
};

export default Navbar;