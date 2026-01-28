import { useCart } from "../../context/CartContext";
import PageWrapper from "./PageWrapper";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto py-20 px-6">
        <BackButton />
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {cart.map(item => (
          <div key={item.id} className="flex justify-between border-b py-4">
            <div>{item.name} × {item.qty}</div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600">
              Remove
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <Link to="/checkout" className="inline-block mt-6 bg-emerald-600 text-white px-6 py-2 rounded">
            Checkout
          </Link>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
