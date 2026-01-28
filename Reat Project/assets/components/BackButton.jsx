import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="mb-6 text-emerald-700 font-semibold">
      ← Back
    </button>
  );
};

export default BackButton;
