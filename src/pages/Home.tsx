import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import products from "@/components/products";
import { Link } from "react-router-dom";
import { addItem } from "@/slices/cartSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://www.viorafragrances.store/cdn/shop/files/WhatsApp_Image_2024-08-24_at_8.34.43_PM_f1fc6b87-3f81-4ce8-bfbd-b098624b547b.jpg?crop=center&v=1724513828&width=1920)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4">VIORA FRAGRANCES</h1>
            <p className="text-xl">Discover Your Signature Scent</p>
          </motion.div>
        </div>
      </div>

      {/* Products Slider */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Collections
        </h2>
        <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.price} Rs</p>
                <button
                  onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
                  className="w-full bg-black text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/catalog" className="text-blue-500 hover:underline">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
