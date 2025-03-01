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
        name: "Sigma",
        description: "A seductive blend of dark rose and vanilla",
        price: 2100,
        image: Sigma,
        category: "floral",
    },
    {
        id: "2",
        name: "Dark Rebel",
        description: "Fresh marine notes with a hint of citrus",
        price: 2000,
        image: DarkRebel,
        category: "fresh",
    },
    {
        id: "3",
        name: "Dynasty",
        description: "A seductive blend of dark rose and vanilla",
        price: 1800,
        image: Dynasty,
        category: "floral",
    },
    {
        id: "4",
        name: "Genevieve",
        description: "Fresh marine notes with a hint of citrus",
        price: 1850,
        image: Genevieve,
        category: "fresh",
    },
    {
        id: "5",
        name: "Midnight",
        description: "Rich and mysterious oriental fragrance",
        price: 1800,
        image: Midnight,
        category: "oriental",
    },
    {
        id: "6",
        name: "Mystique",
        description: "Rich and mysterious oriental fragrance",
        price: 1700,
        image: Mystique,
        category: "oriental",
    },
    {
        id: "7",
        name: "Zephyr",
        description: "Rich and mysterious oriental fragrance",
        price: 1700,
        image: Zephyr,
        category: "oriental",
    },
];

export default products