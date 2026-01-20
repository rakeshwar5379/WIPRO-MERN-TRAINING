import React from 'react';

const Header = () => {
  return (
    <header className=" from-emerald-50 via-white to-amber-50 py-20 px-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 leading-tight">
          Purely Organic, <br />
          <span className="text-emerald-600">Straight from the Farm.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          Support local farmers and enjoy 100% pesticide-free vegetables, fruits, and grains delivered to your doorstep.
        </p>
        <div className="mt-10 flex gap-4">
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-emerald-700 transition">
            Explore Grains
          </button>
          <button className="bg-white border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-bold hover:bg-emerald-50 transition">
            Our Story
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;