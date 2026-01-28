import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import BackButton from "./BackButton";

const Login = ({ setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "er.rakeshwar@gmail.com" && password === "admin123") {
      setIsAdmin(true);
      navigate("/products");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto mt-20 p-6 shadow rounded">
        <BackButton />

        <h3 className="text-2xl font-bold mb-4 text-center">Admin Login</h3>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full mb-4 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </PageWrapper>
  );
};

export default Login;
