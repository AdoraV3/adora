"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import image from '../../../public/CSAgent.jpg'

interface SectionHeaderProps {
  title: string
  highlightedWord: string
  description: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, highlightedWord, description }) => (
  <div className="mb-8 lg:mb-0">
    <h2 className="text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 mb-6 leading-tight">
      {title} <span className="text-orange-500">{highlightedWord}</span>
    </h2>
    <p className="text-gray-700 text-lg leading-relaxed max-w-md">{description}</p>
  </div>
)

interface ContentBlockProps {
  children: React.ReactNode
}

const ContentBlock: React.FC<ContentBlockProps> = ({ children }) => (
  <div className="text-gray-700 text-lg leading-relaxed">{children}</div>
)

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
}

const HowWeMakeDifference: React.FC = () => (
  <section className="bg-white py-16 lg:py-24 px-6">
    <div className="container mx-auto px-4">
      <div className="flex justify-between flex-wrap-reverse gap-12 lg:gap-24">
        {/* Left Content */}
        <motion.div {...fadeInUp} className="w-full lg:w-1/2">
          <SectionHeader
            title="How We Make a"
            highlightedWord="Difference"
            description="At Adora, we specialize in leveraging cutting-edge AI technology to transform customer service."
          />

          <ContentBlock>
            <p>
              We provide businesses with innovative solutions that combine the empathy of human agents with the
              efficiency and scalability of AI. From setting up AI-powered call centers to delivering personalized
              customer interactions, we&apos;re dedicated to redefining the customer service experience for businesses
              worldwide.
            </p>
          </ContentBlock>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={image || "/placeholder.svg"}
              alt="Customer service representative"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

export default HowWeMakeDifference
