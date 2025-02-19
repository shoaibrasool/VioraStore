import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">About VIORA</h1>
          <p className="text-xl text-gray-600">Crafting Memories Through Scent</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
            alt="Perfume crafting"
            className="rounded-lg shadow-lg"
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-gray-600">
              Founded in 2020, VIORA Fragrances was born from a passion for creating unique and memorable scents. Our journey began in a small artisanal workshop, where we experimented with the finest ingredients from around the world.
            </p>
            <p className="text-gray-600">
              Today, we continue to push the boundaries of perfumery, combining traditional techniques with modern innovation to create fragrances that tell a story and leave a lasting impression.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Quality</h3>
              <p className="text-gray-600">We source only the finest ingredients and materials for our fragrances.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">Our commitment to the environment guides every decision we make.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">We constantly explore new techniques and combinations in perfumery.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;