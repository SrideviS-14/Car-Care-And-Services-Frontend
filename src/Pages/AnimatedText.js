import React from "react";
import { motion } from "framer-motion";

function AnimatedText({ text, index }) {
    return (
      <motion.div
        className="card"
        initial={{
          opacity: 0,
          x: index % 2 === 0 ? 50 : -50
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1
          }
        }}
      >
        <p className="card-text">{text}</p>
      </motion.div>
    );
  }
  export default AnimatedText;