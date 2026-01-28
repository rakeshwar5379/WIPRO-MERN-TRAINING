import { useCart } from "../../context/CartContext";

const Card = ({ id, name, price, category, image }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <img src={image} className="h-40 w-full object-cover mb-4" />
      <p className="text-emerald-600 font-bold">{category}</p>
      <h3 className="font-bold">{name}</h3>
      <p>₹ {price}</p>

      <button
        onClick={() => addToCart({ id, name, price, image })}
        className="mt-4 w-full bg-emerald-600 text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
