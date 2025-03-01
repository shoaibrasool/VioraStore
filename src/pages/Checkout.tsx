import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../store/cartStore";
import { OrderDetails } from "../types";
import emailjs from "@emailjs/browser";

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderDetails: OrderDetails = {
      ...formData,
      items,
      total,
    };

    const emailParams = {
      name: formData.fullName,
      email: formData.email,
      total: total.toFixed(2),
      items: items
        .map(
          (item) => `<li>${item.name} - ${item.quantity} x $${item.price}</li>`
        )
        .join(""),
    };

    emailjs
    .send(
      "service_f4retmq", // Your Service ID
      "template_d0ds4tn", // Your Template ID
      emailParams,
      "SxnnPYIe4bYqUhfCp" // Your Public Key
    )
    .then((response) => {
      console.log("Email sent successfully:", response);
      alert("Order placed successfully! Confirmation email sent.");
      clearCart();
    })
    .catch((error) => {
      console.error("Email send error:", error);
      alert("Order placed, but email could not be sent.");
    });

    // Here you would typically send the order to your backend
    console.log("Order submitted:", orderDetails);

    // Clear the cart after successful order
    clearCart();

    // Redirect to a success page or show a success message
    alert("Order placed successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Checkout
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Shipping Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {(item.price * item.quantity).toFixed(2)} Rs
                  </p>
                </div>
              ))}
              <div className="h-px bg-gray-200 my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} Rs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
