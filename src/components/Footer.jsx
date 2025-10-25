import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-dark-text text-gray-300 p-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Janata Graha</h3>
          <p className="text-gray-400">Railway Station Rd, opp. Municipal Building, Curchorem, Goa 403706</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/menu" className="hover:text-sand">Menu</Link></li>
            <li><Link to="/about" className="hover:text-sand">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-sand">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
          <ul className="space-y-2">
            <li><a href="tel:09503965126" className="hover:text-sand">095039 65126</a></li>
            <li><a href="mailto:info@janatagraha.com" className="hover:text-sand">info@janatagraha.com</a></li>
          </ul>
        </div>
        
        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-sand">Instagram</a>
            <a href="#" className="hover:text-sand">Facebook</a>
          </div>
        </div>
        
      </div>
      <div className="text-center text-gray-500 border-t border-gray-700 pt-8 mt-8">
        <p>© 2025 Janata Graha. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer