import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../config/firebase';
import { Product } from "@/types";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Product[];
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    return products;
};

export default Products;