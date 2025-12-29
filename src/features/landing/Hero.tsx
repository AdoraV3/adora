"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full text-amber-900 text-sm font-medium w-fit"
              style={{
                background: "linear-gradient(135deg, #E6E5E5 0%, #C0590E66 100%)",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              With Adora: Your Customer Service AI Agent
            </motion.div>


            {/* Main Heading */}
            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-snug text-balance">
                Revolutionize Your Customer Experience
              </h1>
              <p className="text-base sm:text-lg text-orange-600 max-w-2xl font-medium">
                Enhance your service with AI-powered, real-time, human-like conversations
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/signup"
                className="bg-orange-600 hover:bg-orange-700 text-white w-[180px] flex justify-center items-center h-[50px] rounded-lg text-base sm:text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-center"
              >
                Get Started For Free
              </Link>
              <Link
                href="/login"
                className="border-2 border-white text-orange-600 bg-[#fff] hover:bg-orange-50 w-[180px] flex justify-center items-center h-[50px] rounded-lg text-base sm:text-sm font-semibold transition-all duration-200 text-center"
              >
                Try Voice Assistant
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Image with Chat Overlay */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Chat Window */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Person Image */}
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src="/hero.jpg"
                  alt="Customer service representative with AI chat interface"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 lg:h-96 z-5">
        <Image
          src="/line.png"
          alt="Decorative wave lines"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </section>
  )
}

export default HeroSection
