import { useCart } from "../../context/CartContext";

const Card = ({ id, name, price, category, image }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow transition-colors">
      <img src={image} className="h-40 w-full object-cover mb-4 rounded-lg" alt={name} />
      <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase">{category}</p>
      <h3 className="font-bold text-slate-800 dark:text-white">{name}</h3>
      <p className="text-slate-600 dark:text-slate-300">₹ {price}</p>

      <button
        onClick={() => addToCart({ id, name, price, image })}
        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;