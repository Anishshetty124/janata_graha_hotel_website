import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    isActive 
      ? 'text-sand font-bold' 
      : 'text-white hover:text-sand transition-colors'
  
  // Mobile nav link class
  const mobileNavLinkClass = ({ isActive }) =>
    isActive 
      ? 'text-sand font-bold text-3xl' 
      : 'text-white hover:text-sand transition-colors text-3xl'

  // Animation for the mobile menu
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: "-100%",
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  }

  return (
    <>
      <motion.header 
        className="bg-ocean-blue shadow-lg w-full sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo / Brand Name */}
          <Link to="/" className="text-3xl font-bold text-white tracking-tight z-50 font-heading">
            Janata Graha
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-grow items-center justify-center space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>
          
          {/* Desktop "Book a Table" button was here. It is now removed.
            We added 'flex-grow' and 'justify-center' to the nav links
            to keep them centered.
          */}

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
          
          {/* This empty div balances the flexbox on desktop */}
          <div className="hidden md:block w-0"></div>

        </nav>
      </motion.header>

      {/* --- Mobile Menu (Animated) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-ocean-blue z-40
                       flex flex-col items-center justify-center space-y-10"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/menu" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Menu</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
            

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header