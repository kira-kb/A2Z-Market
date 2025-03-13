"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Watch, Laptop, Headphones, Camera } from "lucide-react";

export default function LoadingAnimation() {
  const products = [
    { icon: <ShoppingCart />, name: "Cart" },
    { icon: <Watch />, name: "Watch" },
    { icon: <Laptop />, name: "Laptop" },
    { icon: <Headphones />, name: "Headphones" },
    { icon: <Camera />, name: "Camera" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex space-x-4 mb-8">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="w-12 h-12 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-900 dark:text-white"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 1, delay: index * 0.2 }}
          >
            {product.icon}
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          A2Z Market
        </p>
      </div>
    </div>
  );
}
