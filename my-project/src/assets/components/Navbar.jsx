import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = ({ isAdmin, setIsAdmin }) => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const signOut = () => {
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav className="flex justify-between px-10 py-5 bg-white shadow sticky top-0">
      <Link to="/" className="text-2xl font-bold text-emerald-700">
        My Agro Mart
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>

        <Link to="/cart">
          🛒 Cart ({cart.length})
        </Link>

        {!isAdmin ? (
          <Link to="/login">Admin Login</Link>
        ) : (
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
