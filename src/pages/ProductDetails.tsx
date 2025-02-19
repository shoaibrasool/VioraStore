import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Midnight Rose',
    description: 'A seductive blend of dark rose and vanilla, this enchanting fragrance opens with rich damascena rose, intertwined with sweet vanilla bourbon and warm amber. The heart reveals subtle notes of patchouli and dark berries, while the base settles into a mesmerizing mix of musk and woody accords.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    category: 'floral'
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    description: 'Fresh marine notes blend seamlessly with citrus in this invigorating scent. Top notes of bergamot and sea salt give way to a heart of lavender and white florals. The base notes of driftwood and clean musk create a lasting impression of a day spent by the ocean.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    category: 'fresh'
  },
  {
    id: '3',
    name: 'Velvet Oud',
    description: 'A rich and mysterious oriental fragrance that combines precious oud wood with warm spices. The opening is an intense blend of saffron and cardamom, leading to a heart of rose and oud. The base notes of vanilla, amber, and sandalwood create a long-lasting, luxurious trail.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6f?auto=format&fit=crop&q=80&w=800',
    category: 'oriental'
  }
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);
  
  const product = products.find(p => p.id === id);

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
            <p className="text-3xl font-semibold">${product.price}</p>
            <div className="h-px bg-gray-200" />
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            
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