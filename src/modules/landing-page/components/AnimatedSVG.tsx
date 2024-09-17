"use client";

import { motion } from "framer-motion";

export function AnimatedSVG() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-64 h-64 text-blue-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <motion.path
        d="M10 10 H 90 V 90 H 10 Z"
        stroke="black"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.svg>
  );
}
