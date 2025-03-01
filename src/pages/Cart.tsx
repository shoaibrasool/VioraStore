import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Cart: React.FC = () => {
  const { items, total, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          to="/catalog"
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price} Rs</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md h-fit"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{total.toFixed(2)} Rs</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="h-px bg-gray-200 my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} Rs</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-black text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;