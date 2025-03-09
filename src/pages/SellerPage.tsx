import { addDoc, collection, db, deleteObject, getDownloadURL, ref, storage, uploadBytes } from '@/config/firebase';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerPage: React.FC = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: 0, imageUrl: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input
  const imageStorageRef = useRef<string | null>(null); // Ref to keep track of the uploaded image file

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFile) {
      try {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);

        // Get the download URL
        const imageUrl = await getDownloadURL(imageRef);

        // Add product with the image URL to Firestore
        const docRef = await addDoc(collection(db, "products"), {
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: imageUrl,
        });
        console.log("Document written with ID: ", docRef.id);
        navigate('/catalog'); // Redirect to catalog page
      } catch (error) {
        console.error("Error uploading image or adding document: ", error);
      }
    } else {
      console.error("No image file selected");
    }
  };

  const handleCancel = () => {
    if (imageFile) {
      // Delete the file from Firebase Storage if user cancels or leaves the page
      const imageRef = ref(storage, `images/${imageFile.name}`);
      deleteObject(imageRef)
        .then(() => console.log("File deleted successfully"))
        .catch((error:Error) => console.error("Error deleting file: ", error));
    }
    navigate('/catalog'); // Redirect if canceled
  };

  // Cleanup the file if user leaves the page or cancels
  React.useEffect(() => {
    return () => {
      if (imageFile && imageStorageRef.current) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        deleteObject(imageRef)
          .then(() => console.log("File deleted successfully on component unmount"))
          .catch((error:Error) => console.error("Error deleting file on unmount: ", error));
      }
    };
  }, [imageFile]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
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
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
        <button type="button" onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded ml-4">Cancel</button>
      </form>
    </div>
  );
};

export default SellerPage;