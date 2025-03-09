import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import products from "@/components/products";
import { addItem } from "@/slices/cartSlice";
import { collection, db, getDocs } from "@/config/firebase";

const Catalog: React.FC = () => {
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      console.log(productList);  // Log the products to the console
    } catch (error) {
      console.error("Error getting products: ", error);
    }
  };
  useEffect(()=>{
    getProducts()
  })
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
                  <span className="text-xl font-bold">{product.price} Rs</span>
                  <button
                    onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
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
