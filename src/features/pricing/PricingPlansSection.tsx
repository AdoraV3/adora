"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { motion, type Variants } from "framer-motion"

const PricingCard = ({
  price,
  period = "/month",
  title,
  description,
  features,
  isPopular = false,
  buttonText = "Choose plan",
  priceColor = "text-gray-800",
  index = 0,
}: {
  price: string
  period?: string
  title: string
  description: string
  features: string[]
  isPopular?: boolean
  buttonText?: string
  priceColor?: string
  index?: number
}) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1], // ✅ FIXED
      },
    },
  }

  const featureVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: index * 0.1 + 0.2,
      },
    },
  }

  const featureItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      className={`relative rounded-2xl p-6 transition-all ${
        isPopular
          ? "bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-2xl"
          : "bg-white border border-gray-200 shadow-lg"
      }`}
    >
      {isPopular && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.1 + 0.3,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute -top-3 left-1/2 transform -translate-x-1/2"
        >
          <span className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </motion.div>
      )}

      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.1 + 0.15,
            type: "spring",
            stiffness: 150,
          }}
          className="flex items-baseline justify-center mb-2"
        >
          <span className={`text-4xl font-bold ${isPopular ? "text-white" : priceColor}`}>
            {price}
          </span>
          <span className={`text-lg ml-1 ${isPopular ? "text-orange-100" : "text-gray-500"}`}>
            {period}
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
          className={`text-xl font-bold mb-2 ${isPopular ? "text-white" : "text-gray-800"}`}
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.25, duration: 0.6 }}
          className={`text-sm ${isPopular ? "text-orange-100" : "text-gray-600"}`}
        >
          {description}
        </motion.p>
      </div>

      <motion.ul
        variants={featureVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-8"
      >
        {features.map((feature, i) => (
          <motion.li key={i} variants={featureItemVariants} className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
            >
              <Check
                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  isPopular ? "text-orange-200" : "text-green-500"
                }`}
              />
            </motion.div>
            <span className={`text-sm ${isPopular ? "text-white" : "text-gray-700"}`}>
              {feature}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
          isPopular
            ? "bg-orange-400 hover:bg-orange-300 text-white"
            : "bg-orange-500 hover:bg-orange-600 text-white"
        }`}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  )
}

export default function PricingPlansSection() {
  const [isMonthly, setIsMonthly] = useState(true)

  const pricing = {
    basic: isMonthly ? "$99" : "$950",
    standard: isMonthly ? "$199" : "$1,910",
    popular: isMonthly ? "$399" : "$3,830",
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Toggle Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full p-1 shadow-lg">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly ? "bg-orange-500 text-white" : "text-gray-600 hover:text-gray-800"
              } px-6 py-2 rounded-full font-medium text-sm transition-all duration-200`}
            >
              MONTHLY
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMonthly(false)}
              className={`${
                !isMonthly ? "bg-orange-500 text-white" : "text-gray-600 hover:text-gray-800"
              } px-6 py-2 rounded-full font-medium text-sm transition-all duration-200`}
            >
              YEARLY
            </motion.button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4"
        >
          <PricingCard
            price={pricing.basic}
            period={isMonthly ? "/month" : "/year"}
            title="Basic Plan"
            description="For small businesses looking for AI voice support and basic functionality."
            features={[
              "1 AI Voice agent",
              "Handle up to 25 calls/month",
              "Access to 5 languages and accents",
              "Email Support",
              "Basic knowledge base integration",
              "Dedicated customer service phone number",
            ]}
            index={0}
          />

          <PricingCard
            price={pricing.standard}
            period={isMonthly ? "/month" : "/year"}
            title="Standard Plan"
            description="Ideal for business looking for more flexibility and functionality."
            features={[
              "2 AI Voice agent",
              "Handle up to 50 calls/month",
              "Access to 20 languages and accents",
              "Customizable knowledge base",
              "Integration with up to 5 platforms",
              "Real-time call analytics",
              "24/7 customer support",
              "CRM integration (limited)",
            ]}
            index={1}
          />

          <PricingCard
            price={pricing.popular}
            period={isMonthly ? "/month" : "/year"}
            title="Premium Plan"
            description="Best for growing businesses with advanced needs."
            features={[
              "Unlimited AI agents",
              "Handle up to 1000 calls/month",
              "20+ languages & accents",
              "3000+ integrations",
              "Dedicated account manager",
              "Advanced function calling",
              "Premium 24/7 support",
            ]}
            isPopular
            index={2}
          />

          <PricingCard
            price="Custom"
            period="/month"
            title="Enterprise Plan"
            description=""
            priceColor="text-orange-500"
            features={[
              "Unlimited AI agents",
              "10,000+ calls/month",
              "300+ languages & accents",
              "Custom integrations",
              "Dedicated account manager",
              "SLA-backed support",
            ]}
            index={3}
          />
        </motion.div>
      </div>
    </div>
  )
}
