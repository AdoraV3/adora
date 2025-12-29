"use client"

import { motion } from "framer-motion"

const AdoraTerms = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const headingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  }

  return (
    <div className="bg-white">
      {/* Main Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-full">
        {/* Introduction Section */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
            variants={headingVariants}
          >
            Introduction
          </motion.h2>
          <motion.p className="text-gray-700 text-sm sm:text-base leading-relaxed" variants={itemVariants}>
            Adora is a B2B AI-powered customer service platform provided by Poulina Inc. These terms define the
            relationship between Poulina Inc (&quot;Adora&quot;, &quot;we&quot;, &quot;us&quot;) and you
            (&quot;User&quot;, &quot;you&quot;) regarding the use of our platform and services.
          </motion.p>
        </motion.div>

        {/* Definition Section */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
            variants={headingVariants}
          >
            Definition
          </motion.h2>
          <motion.div
            className="space-y-4 sm:space-y-5 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">Adora</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Adora is a B2B AI-powered customer service platform provided by Poulina Inc.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">User</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Refers to businesses and authorized individuals accessing the platform.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">Content</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Includes any data, text, or media uploaded, processed, or generated using the Services.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Use of Services */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
            variants={headingVariants}
          >
            Use of Services
          </motion.h2>
          <motion.p className="text-gray-700 mb-4 sm:mb-5 text-sm sm:text-base" variants={itemVariants}>
            Adora is designed to streamline customer service processes through AI-powered tools. Users must adhere to
            the following:
          </motion.p>

          <motion.div
            className="space-y-4 sm:space-y-5 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">1. Eligibility</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                You must be a registered business entity or authorized representative to use Adora.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">
                2. Account Responsibilities
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Maintain the confidentiality of login credentials. Notify Adora immediately of unauthorized account use.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">3. Permitted Use</h3>
              <p className="text-gray-700 text-sm sm:text-base">You may use Adora only for lawful business purposes.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">
                4. Prohibited Activities
              </h3>
              <motion.ul
                className="text-gray-700 space-y-2 sm:space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.li className="flex items-start gap-2 sm:gap-3" variants={itemVariants}>
                  <span className="text-orange-600 font-bold flex-shrink-0 mt-0.5">•</span>
                  <span className="text-sm sm:text-base">
                    Use of platform for fraudulent or illegal activities is highly prohibited.
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-2 sm:gap-3" variants={itemVariants}>
                  <span className="text-orange-600 font-bold flex-shrink-0 mt-0.5">•</span>
                  <span className="text-sm sm:text-base">
                    Modify, reverse-engineer, or decompile Adora&apos;s code.
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-2 sm:gap-3" variants={itemVariants}>
                  <span className="text-orange-600 font-bold flex-shrink-0 mt-0.5">•</span>
                  <span className="text-sm sm:text-base">Introduce malware, spam, or other disruptive elements.</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Subscription and Billing */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
            variants={headingVariants}
          >
            Subscription and Billing
          </motion.h2>
          <motion.div
            className="space-y-4 sm:space-y-5 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">1. Payment Terms</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Subscription fees are billed monthly or annually, depending on your plan. Payments are non-refundable
                unless explicitly stated otherwise.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">2. Cancellation</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                You may cancel your subscription at any time. Cancellation will take effect at the end of the billing
                cycle.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">3. Changes to Fees</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Adora reserves the right to adjust subscription fees with prior notice.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Intellectual Property */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
            variants={headingVariants}
          >
            Intellectual Property
          </motion.h2>
          <motion.p className="text-gray-700 text-sm sm:text-base" variants={itemVariants}>
            Adora and all related materials are the intellectual property of Poulina Inc. Users are granted a
            non-exclusive, non-transferable license to use the platform for their business operations.
          </motion.p>
        </motion.div>

        {/* Limitation of Liability */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
            variants={headingVariants}
          >
            Limitation of Liability
          </motion.h2>
          <motion.p className="text-gray-700 mb-4 sm:mb-5 text-sm sm:text-base" variants={itemVariants}>
            Adora is provided &quot;as-is&quot; without warranties of any kind. Poulina Inc. is not liable for:
          </motion.p>
          <motion.div
            className="space-y-4 sm:space-y-5 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">Losses</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Caused by user error, third-party service failures, or interruptions.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl">
                Indirect or Consequential Damages
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">Not covered under liability.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Termination */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
            variants={headingVariants}
          >
            Termination
          </motion.h2>
          <motion.p className="text-gray-700 text-sm sm:text-base" variants={itemVariants}>
            Adora may suspend or terminate your account if you violate these Terms. Upon termination, access to all
            platform features will cease immediately.
          </motion.p>
        </motion.div>

        {/* Governing Law */}
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
            variants={headingVariants}
          >
            Governing Law
          </motion.h2>
          <motion.p className="text-gray-700 text-sm sm:text-base" variants={itemVariants}>
            These Terms are governed by the laws of Ontario, Canada.
          </motion.p>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          className="mb-12 sm:mb-14 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
            variants={headingVariants}
          >
            Changes to Terms
          </motion.h2>
          <motion.p className="text-gray-700 text-sm sm:text-base" variants={itemVariants}>
            We may update these Terms periodically. Continued use of the Services constitutes acceptance of any
            modifications.
          </motion.p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-orange-600 text-white rounded-lg p-6 sm:p-8 lg:p-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ctaVariants}
        >
          <motion.h3
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 leading-tight"
            variants={headingVariants}
          >
            Let Adora Take the Calls, While You Take the Lead.
          </motion.h3>
          <motion.button
            className="w-full sm:w-auto bg-white text-orange-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
            initial="initial"
            whileHover="hover"
            variants={buttonVariants}
          >
            Get Started to Experience
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default AdoraTerms
