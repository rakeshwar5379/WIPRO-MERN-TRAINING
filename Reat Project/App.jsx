import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import Products from "./assets/components/Products";
import Contact from "./assets/components/Contact";
import Login from "./assets/components/Login";
import Cart from "./assets/components/Cart";
import Checkout from "./assets/components/Checkout";

import { CartProvider } from "./context/CartContext";
import productsData from "./data/products.json";

function App() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => setProducts(productsData), []);

  return (
    <CartProvider>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Products
                  products={products}
                  setProducts={setProducts}
                  isAdmin={isAdmin}
                />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                setProducts={setProducts}
                isAdmin={isAdmin}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </CartProvider>
  );
}

export default App;
