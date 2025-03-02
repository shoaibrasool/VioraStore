import Jwelrey from "../assets/images/testImage.webp";
import Sigma from "../assets/images/Sigma.jpeg";
import DarkRebel from "../assets/images/Dark Rebel.jpeg";
import Dynasty from "../assets/images/Dynasty.jpeg";
import Genevieve from "../assets/images/Genevieve.jpeg";
import Midnight from "../assets/images/Midnight.jpeg";
import Mystique from "../assets/images/Mystique.jpeg";
import Zephyr from "../assets/images/Zephyr.jpeg";
import { Product } from "@/types";

const products: Product[] = [
    {
        id: "1",
        name: "Black Elegance Jewelry Set With Free Delivery",
        description: "Black Elegance Jewelry Set Includes: 1x Bracelet1x Necklace1x Ring1x Earrings ✨ Anti - tarnish Material💎 Smooth excellent finish🔗 Stainless Steel🌟 Elegant and Durable Design",
        price: 850.00,
        image: Jwelrey,
        category: "floral",
    },
    {
        id: "2",
        name: "White Musk",
        description: "Fresh marine notes with a hint of citrus",
        price: 1800,
        image: DarkRebel,
        category: "fresh",
    },
    {
        id: "3",
        name: "Dunhil Desire",
        description: "A seductive blend of dark rose and vanilla",
        price: 1850,
        image: Dynasty,
        category: "floral",
    },
    {
        id: "4",
        name: "Bakrat",
        description: "Fresh marine notes with a hint of citrus",
        price: 1950,
        image: Genevieve,
        category: "fresh",
    },
    {
        id: "5",
        name: "Eternity",
        description: "Rich and mysterious oriental fragrance",
        price: 1900,
        image: Midnight,
        category: "oriental",
    },
    {
        id: "6",
        name: "Dior",
        description: "Rich and mysterious oriental fragrance",
        price: 2250,
        image: Mystique,
        category: "oriental",
    },
    {
        id: "7",
        name: "Tuscan Leather",
        description: "Rich and mysterious oriental fragrance",
        price: 2150,
        image: Zephyr,
        category: "oriental",
    },
    {
        id: "8",
        name: "Sigma",
        description: "A seductive blend of dark rose and vanilla",
        price: 2250,
        image: Sigma,
        category: "floral",
    },
];

export default products