import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { theme } from '../constants/theme';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/contact', label: 'Contact' },
    { to: '/about', label: 'About Us' },
  ];

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween' }}
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" color={theme.colors.primary} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block py-2 text-lg hover:text-gray-600 transition-colors"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;