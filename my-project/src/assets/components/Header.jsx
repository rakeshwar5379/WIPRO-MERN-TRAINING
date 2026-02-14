const Header = () => {
  return (
    <header className="bg-gradient from-emerald-100 to-emerald-50 py-32 px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800">
          Purely Organic <br />
          <span className="text-emerald-700">From the Farm</span>
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          Pesticide-free vegetables, fruits, and grains.
        </p>
      </div>
    </header>
  );
};

export default Header;
