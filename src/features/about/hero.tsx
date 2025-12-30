"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import image from '../../../public/empowerment.jpg'

interface DecorativeShapeProps {
  className?: string
  delay?: number
}

const DecorativeShape: React.FC<DecorativeShapeProps> = ({ className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.3, scale: 1 }}
    transition={{ duration: 1, delay }}
    className={`bg-orange-200 ${className}`}
  />
)

const AboutUsHero: React.FC = () => (
  <div className="min-h-[50vh] lg:min-h-screen bg-white relative overflow-hidden">
    {/* Decorative background shapes */}
    <DecorativeShape className="absolute top-0 left-0 w-32 h-64 lg:w-48 lg:h-96" delay={0.1} />
    <DecorativeShape className="absolute top-0 left-32 w-24 h-32 lg:left-48 lg:w-36 lg:h-48" delay={0.2} />
    <DecorativeShape className="absolute top-16 left-56 w-20 h-40 lg:left-84 lg:w-32 lg:h-64" delay={0.3} />
    <DecorativeShape className="absolute top-12 right-0 w-28 h-48 lg:w-40 lg:h-72" delay={0.4} />
    <DecorativeShape className="absolute bottom-0 right-28 w-24 h-32 lg:right-40 lg:w-36 lg:h-48" delay={0.5} />

    <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row max-md:flex-col-reverse gap-8 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 flex-1"
        >
          <div className="mb-6">
            <span className="text-orange-500 font-medium text-lg">About us</span>
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Empowering
            <br /> businesses to thrive
          </h1>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="order-1 lg:order-2 flex-1"
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={image || "/placeholder.svg"}
              alt="Team collaboration"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
)

export default AboutUsHero
