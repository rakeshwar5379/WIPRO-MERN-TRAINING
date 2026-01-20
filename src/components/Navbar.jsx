function Navbar() {
  return (
    <nav className="w-full bg-neutral-800 text-amber-50 px-6 py-4 flex items-center justify-between">
      
      {/* Left side – Brand */}
      <div className="text-xl font-bold tracking-wide">
        Great Learning
      </div>

      {/* Right side – Menu */}
      <ul className="flex gap-6 text-sm font-medium">
        <li className="cursor-pointer hover:text-amber-400 transition">
          Home
        </li>
        <li className="cursor-pointer hover:text-amber-400 transition">
          Courses
        </li>
        <li className="cursor-pointer hover:text-amber-400 transition">
          About
        </li>
        <li className="cursor-pointer hover:text-amber-400 transition">
          Contact
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
