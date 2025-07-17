import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Transform Your Business?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          Let's collaborate to build intelligent software solutions that drive
          your business forward.
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <a
            href="#contact"
            className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition inline-block whitespace-nowrap"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTA;