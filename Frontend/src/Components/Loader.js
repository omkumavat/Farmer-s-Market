import React from "react";
import { motion } from "framer-motion";
import "../CSS/loader.css";

const loadingCircleVariants = {
  animate: {
    y: ["0%", "60%", "0%"], // Keyframes for smooth up-down animation
  },
};
const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const Loader = () => {
  return (
    <div>
      {/* Overlay background */}
      <div className="loader-overlay"></div>

      {/* Loader */}
      <div className="loader-container">
        <motion.span
          className="loader-circle"
          variants={loadingCircleVariants}
          animate="animate"
          transition={{
            ...loadingCircleTransition,
            delay: 0, // No delay for the first circle
          }}
        ></motion.span>
        <motion.span
          className="loader-circle"
          variants={loadingCircleVariants}
          animate="animate"
          transition={{
            ...loadingCircleTransition,
            delay: 0.2, // Slight delay for the second circle
          }}
        ></motion.span>
        <motion.span
          className="loader-circle"
          variants={loadingCircleVariants}
          animate="animate"
          transition={{
            ...loadingCircleTransition,
            delay: 0.4, // Slightly longer delay for the third circle
          }}
        ></motion.span>
      </div>
    </div>
  );
};

export default Loader;
