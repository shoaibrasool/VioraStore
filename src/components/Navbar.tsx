import React from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { motion } from "framer-motion";
import { theme } from "../constants/theme";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-lg shadow-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="p-2"
          > 
            <Menu className="w-6 h-6" color={theme.colors.primary} />
          </motion.button>

          <Link to="/" className="text-2xl font-bold text-center">
            VIORA
          </Link>

          <Link to="/cart" className="p-2 relative">
            <ShoppingCart className="w-6 h-6" color={theme.colors.primary} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mini Navbar */}
      <div className="fixed top-16 left-0 right-0 h-8 bg-black flex items-center justify-center z-40">
        <p className="text-white text-sm font-medium">
          Free shipping over 3000rs
        </p>
      </div>
    </>
  );
};

export default Navbar;
