import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { Product } from "../types";
import Sigma from "../assets/images/Sigma.jpeg";
import DarkRebel from "../assets/images/Dark Rebel.jpeg";
import Dynasty from "../assets/images/Dynasty.jpeg";
import Genevieve from "../assets/images/Genevieve.jpeg";
import Midnight from "../assets/images/Midnight.jpeg";
import Mystique from "../assets/images/Mystique.jpeg";
import Zephyr from "../assets/images/Zephyr.jpeg";

const products: Product[] = [
  {
    id: "1",
    name: "Sigma",
    description: "A seductive blend of dark rose and vanilla",
    price: 129.99,
    image: Sigma,
    category: "floral",
  },
  {
    id: "2",
    name: "Dark Rebel",
    description: "Fresh marine notes with a hint of citrus",
    price: 99.99,
    image: DarkRebel,
    category: "fresh",
  },
  {
    id: "3",
    name: "Dynasty",
    description: "A seductive blend of dark rose and vanilla",
    price: 129.99,
    image: Dynasty,
    category: "floral",
  },
  {
    id: "4",
    name: "Genevieve",
    description: "Fresh marine notes with a hint of citrus",
    price: 99.99,
    image: Genevieve,
    category: "fresh",
  },
  {
    id: "5",
    name: "Midnight",
    description: "Rich and mysterious oriental fragrance",
    price: 159.99,
    image: Midnight,
    category: "oriental",
  },
  {
    id: "6",
    name: "Mystique",
    description: "Rich and mysterious oriental fragrance",
    price: 159.99,
    image: Mystique,
    category: "oriental",
  },
  {
    id: "7",
    name: "Zephyr",
    description: "Rich and mysterious oriental fragrance",
    price: 159.99,
    image: Zephyr,
    category: "oriental",
  },
];

const Catalog: React.FC = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-2xl font-semibold mb-2">
                    {product.name}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button
                    onClick={() => addItem({ ...product, quantity: 1 })}
                    className="bg-black text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
