import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react' // Icons

// Animation variant for items sliding in
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100 } 
  }
};

function Contact() {
  return (
    <div className="container mx-auto px-6 py-16">
      
      {/* Page Title */}
      <motion.h1 
        className="text-5xl font-bold text-center text-dark-text mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get In Touch
      </motion.h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* --- Left Column: Info & Form --- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }} // Stagger children
        >
          <motion.h2 
            className="text-3xl font-bold text-ocean-blue mb-4"
            variants={itemVariants}
          >
            Contact Details
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            variants={itemVariants}
          >
            Visit us, give us a call, or send us a message. We're here to help!
          </motion.p>

          {/* Info Blocks */}
          <div className="space-y-6 mb-12">
            <motion.div className="flex items-center" variants={itemVariants}>
              <MapPin className="text-sand mr-4" size={24} />
              <span className="text-gray-700">
                Railway Station Rd, opp. Municipal Building, Curchorem, Goa 403706
              </span>
            </motion.div>
            <motion.div className="flex items-center" variants={itemVariants}>
              <Phone className="text-sand mr-4" size={24} />
              <a href="tel:09503965126" className="text-gray-700 hover:text-ocean-blue">
                095039 65126
              </a>
            </motion.div>
            <motion.div className="flex items-center" variants={itemVariants}>
              <Mail className="text-sand mr-4" size={24} />
              <a href="mailto:janatagraha@gmail.com" className="text-gray-700 hover:text-ocean-blue">
                info@janatagraha.com
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form 
            className="space-y-6"
            action="mailto:info@janatagraha.com" // Simple mail action
            method="POST"
            encType="text/plain"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-dark-text mb-2">Your Name</label>
              <input type="text" name="name" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-ocean-blue" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-dark-text mb-2">Your Email</label>
              <input type="email" name="email" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-ocean-blue" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-bold text-dark-text mb-2">Message</label>
              <textarea name="message" rows="5" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-ocean-blue"></textarea>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button 
                type="submit"
                className="bg-sand text-ocean-blue px-8 py-3 rounded-full font-bold
                           hover:bg-light-cream transition duration-300 shadow-md
                           transform hover:scale-105"
              >
                Send Message
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* --- Right Column: Map --- */}
        <motion.div 
         className="w-full h-[400px] md:h-[600px] rounded-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <iframe
            title="Janata Graha location"
            src="https://www.google.com/maps?q=15.2627621,74.1079106&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

      </div>
    </div>
  )
}

export default Contact