"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import ceo from '../../../public/uche.jpg'
import advisor from '../../../public/Kyra.jpg'
import developer from '../../../public/Jaypee.jpg'
import designer from '../../../public/Prince.jpg'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const team = [
  { name: "Uche Igbonacho", role: "Founder & CEO", src: ceo },
  { name: "Kyra Arthur", role: "Customer Operation Advisor", src: advisor },
  { name: "Jaypee", role: "Lead Frontend Developer", src: developer },
  { name: "Prince Jehoshaphat", role: "Lead Product Designer", src: designer },
]

export default function OurPeople() {
  return (
    <div className="py-16 px-4 md:px-16 flex flex-col items-center gap-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl text-center font-bold"
      >
        Meet Our <span className="text-orange-500">People</span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex w-full flex-wrap justify-center gap-12 lg:justify-between"
      >
        {team.map((person, idx) => (
          <motion.div key={idx} variants={item} className="flex flex-col items-center">
            <div className="relative group">
              <Image
                className="w-44 h-56 object-cover rounded-tl-full rounded-tr-full rounded-br-full shadow-lg transition-transform duration-300 group-hover:scale-105"
                alt={person.name}
                src={person.src || "/placeholder.svg"}
              />
            </div>
            <div className="font-semibold mt-4 text-lg text-center">{person.name}</div>
            <small className="text-gray-500 text-sm">{person.role}</small>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
