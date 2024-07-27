import React from "react";
import { motion } from "framer-motion";

function AnimatedCard({ children, index }) {
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
        {children}
      </motion.div>
    );
}
export default AnimatedCard;
