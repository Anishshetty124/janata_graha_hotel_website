import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Flame, Leaf, Smile } from 'lucide-react' // Icons for our values

// Animation variant for items sliding in on scroll
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function About() {
  return (
    <div className="container mx-auto px-6 py-16">
      
      {/* Page Title */}
      <motion.h1 
        className="text-5xl font-bold text-center text-dark-text mb-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Janata Graha
      </motion.h1>

      {/* --- Our Story Section (Split Layout) --- */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left: Image */}
        <motion.div 
          className="rounded-lg shadow-xl overflow-hidden h-[400px]"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img 
            src="/hotel.png" // Links to public/hotel.png
            alt="Inside Janata Graha Restaurant" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Right: Text Content */}
        <div className="text-lg text-gray-700 space-y-4">
          <h2 className="text-3xl font-bold text-ocean-blue mb-4">
            Our Story
          </h2>
          <p>
            Born from a passion for authentic South Indian and traditional Goan cuisine, Janata Graha has been a cherished culinary haven in Curchorem for decades.
          </p>
          <p>
            Our mission is simple: to serve food that feels like home. We believe in dishes that bring people together, made with love, the freshest local ingredients, and the timeless recipes passed down through generations.
          </p>
          <p>
            From your first sip of coffee at 6 AM to a hearty lunch, we are more than just a restaurant—we are a part of the community.
          </p>
        </div>
      </motion.section>

      {/* --- Our Promise Section --- */}
      <motion.section 
        className="py-20 bg-light-cream rounded-lg"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-center text-dark-text mb-12">
          Our Promise to You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
          
          {/* Card 1: Authentic Flavors */}
          <div className="text-center p-6">
            <Flame className="mx-auto text-sand mb-4" size={48} />
            <h3 className="text-2xl font-bold text-ocean-blue mb-2">Authentic Flavors</h3>
            <p className="text-gray-700">We use traditional spices and cooking methods to ensure every bite is true to its origin.</p>
          </div>
          
          {/* Card 2: Fresh & Local */}
          <div className="text-center p-6">
            <Leaf className="mx-auto text-sand mb-4" size={48} />
            <h3 className="text-2xl font-bold text-ocean-blue mb-2">Fresh & Local</h3>
            <p className="text-gray-700">We source our ingredients from local Goan markets daily to guarantee freshness.</p>
          </div>
          
          {/* Card 3: A Warm Welcome */}
          <div className="text-center p-6">
            <Smile className="mx-auto text-sand mb-4" size={48} />
            <h3 className="text-2xl font-bold text-ocean-blue mb-2">A Warm Welcome</h3>
            <p className="text-gray-700">Our restaurant is your second home. We're dedicated to service that makes you feel like family.</p>
          </div>
          
        </div>
      </motion.section>
      
      {/* --- CTA Section --- */}
      <motion.section
        className="text-center py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-dark-text mb-6">Come Dine With Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          Experience the taste and tradition of Janata Graha.
        </p>
        <Link 
          to="/contact" 
          className="bg-sand text-ocean-blue px-10 py-4 rounded-full font-bold text-lg
                     hover:bg-light-cream transition duration-300 shadow-lg
                     transform hover:scale-105"
        >
          Find Us
        </Link>
      </motion.section>
      
    </div>
  )
}

export default About