"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer?: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className="border-b border-gray-200 py-6"
  >
    <motion.button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left group"
      whileHover={{ paddingLeft: 8 }}
    >
      <h3 className="text-lg sm:text-xl font-medium text-orange-500 pr-4 group-hover:text-orange-600 transition-colors">
        {question}
      </h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        {isOpen ? (
          <Minus className="w-6 h-6 text-gray-600" />
        ) : (
          <Plus className="w-6 h-6 text-gray-600" />
        )}
      </motion.div>
    </motion.button>

    <AnimatePresence>
      {isOpen && answer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 pr-8 overflow-hidden"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-gray-700 text-base sm:text-lg leading-relaxed"
          >
            {answer}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  const faqItems = [
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "We offer flexible subscription options, allowing you to adjust or cancel your plan as per your business requirements, with transparent and simple cancellation policies.",
    },
    {
      question: "Can this solution be customized to suit my business's specific needs?",
      answer: "",
    },
    {
      question: "Is it possible for Adora call to manage multiple branches?",
      answer: "",
    },
    {
      question: "Is there any setup fee involved?",
      answer: "",
    },
    {
      question: "Can I change my plan anytime",
      answer: "",
    },
  ]

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // ✅ FIXED
      },
    },
  }

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <div className="sticky top-8">
              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6"
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-orange-500 leading-relaxed"
              >
                We&apos;re here to help with any questions you have about plans,
                pricing, and supported features
              </motion.p>
            </div>
          </motion.div>

          {/* Right Side */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                General
              </h3>

              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems.includes(index)}
                  onToggle={() => toggleItem(index)}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
