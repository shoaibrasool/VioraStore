import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../config/firebase';
import { motion } from "framer-motion";

const SellerPage: React.FC = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: 0, imageUrl: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const storageRef = ref(storage, `productImages/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        const productWithImage = { ...product, imageUrl };
        await addDoc(collection(db, 'products'), productWithImage);
        navigate('/catalog');
      }
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("There was an error adding the product. Please try again.");
    }
  };

  const initiateDelete = (id: string) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteDoc(doc(db, 'products', deleteId));
      setProducts(products.filter(product => product.id !== deleteId));
      setShowDeletePopup(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Error deleting product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10 w-full lg:w-4/5">
      <h1 className="text-2xl font-bold mb-4 bg-black text-white p-3 rounded">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-black text-white p-2 rounded">Add Product</button>
      </form>

      <h1 className="text-2xl font-bold mt-8 mb-4 bg-black text-white p-3 rounded">Delete existing products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div 
              key={product.id} 
              className="relative border rounded-lg p-4 group"
            >
              <div className="absolute top-0 right-0 hidden group-hover:flex items-center justify-center w-full h-full bg-red-500 bg-opacity-50">
                <button
                  onClick={() => initiateDelete(product.id)}
                  className="text-white p-2 rounded hover:bg-red-700"
                >
                  🗑️ Delete
                </button>
              </div>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))
        )}
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeletePopup(false);
                  setDeleteId(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SellerPage;