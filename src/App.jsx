import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './assets/components/Navbar'
import Header from './assets/components/Header'
import Footer from './assets/components/Footer'
import Card from './assets/components/Card'
import './App.css'

function App() {
  const products = [
    { name: "Organic Wheat", price: "12.00", category: "Grains", icon: "🌾" },
    { name: "Fresh Avocados", price: "8.50", category: "Fruits", icon: "🥑" },
    { name: "Pure Honey", price: "15.00", category: "Natural", icon: "🍯" },
    { name: "Green Broccoli", price: "4.00", category: "Vegetables", icon: "🥦" },
  ];

  return (
    <div className="font-sans text-slate-900">
      <Navbar />
      <Header />
      
      {/* Product Section */}
      <section className="max-w-6xl mx-auto px-10 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-slate-500">Picked fresh this morning</p>
          </div>
          <button className="text-emerald-600 font-semibold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, index) => (
            <Card key={index} {...p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;