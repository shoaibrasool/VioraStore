import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Midnight Rose',
    description: 'A seductive blend of dark rose and vanilla',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    category: 'floral'
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    description: 'Fresh marine notes with a hint of citrus',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    category: 'fresh'
  },
  {
    id: '3',
    name: 'Midnight Rose',
    description: 'A seductive blend of dark rose and vanilla',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    category: 'floral'
  },
  {
    id: '4',
    name: 'Ocean Breeze',
    description: 'Fresh marine notes with a hint of citrus',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    category: 'fresh'
  },
  {
    id: '5',
    name: 'Velvet Oud',
    description: 'Rich and mysterious oriental fragrance',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6f?auto=format&fit=crop&q=80&w=800',
    category: 'oriental'
  }
];

const Home: React.FC = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center" 
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596203721435-1de3622a9e0a?auto=format&fit=crop&q=80&w=2000)' }}>
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
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Collections</h2>
        <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <button
                  onClick={() => addItem({ ...product, quantity: 1 })}
                  className="w-full bg-black text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;