"use client"

import { motion, type Variants } from "framer-motion"

export default function PricingHeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // ✅ FIXED
      },
    },
  }

  return (
    <div className="relative min-h-[400px] bg-white overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-12 sm:grid-cols-16 md:grid-cols-20 lg:grid-cols-24 xl:grid-cols-28 gap-px h-full">
          {Array.from({ length: 336 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01, duration: 0.5 }}
              className={`border border-gray-200 ${
                [23, 45, 67, 89, 134, 156, 178, 234, 267, 298, 312].includes(i)
                  ? "bg-orange-200"
                  : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-gray-800 leading-tight mb-4 sm:mb-6"
          >
            Choose The Perfect
            <br className="hidden sm:block" />
            <span className="block mt-2 sm:mt-0 xl:text-5xl">
              Plan For Your Business
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-500 font-medium"
          >
            Simple, Transparent Pricing for Smarter Customer Support
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
