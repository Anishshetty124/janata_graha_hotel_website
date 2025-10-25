import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        to="/contact"
        aria-label="Contact us"
        className="flex items-center gap-3 bg-ocean-blue text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transform transition"
      >
        <Phone size={18} />
        <span className="font-bold">Book a Table</span>
      </Link>
    </motion.div>
  )
}
