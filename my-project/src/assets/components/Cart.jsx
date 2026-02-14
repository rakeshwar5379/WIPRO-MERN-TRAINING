import { useCart } from "../../context/CartContext";
import PageWrapper from "./PageWrapper";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto py-20 px-6">
        <BackButton />
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        {cart.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-4"
          >
            {/* Product Name */}
            <div className="font-semibold">{item.name}</div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-200 rounded text-lg"
              >
                −
              </button>

              <span className="min-w-\[24px] text-center">{item.qty}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-3 py-1 bg-gray-200 rounded text-lg"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600"
            >
              Remove
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <Link
            to="/checkout"
            className="inline-block mt-6 bg-emerald-600 text-white px-6 py-2 rounded"
          >
            Checkout
          </Link>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
