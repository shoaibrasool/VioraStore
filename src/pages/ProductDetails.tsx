import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import products from "@/components/products";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-semibold">{product.price} Rs</p>
            <div className="h-px bg-gray-200" />
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Notes:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Top Notes: Bergamot, Cardamom</li>
                <li>Heart Notes: Rose, Jasmine</li>
                <li>Base Notes: Vanilla, Amber</li>
              </ul>
            </div>

            <button
              onClick={() => addItem({ ...product, quantity: 1 })}
              className="w-full bg-black text-white py-3 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Size:</span>
                <span>50ml</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span className="capitalize">{product.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
