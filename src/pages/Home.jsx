import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react'
import TestimonialCarousel from '../components/TestimonialCarousel'

// --- Popular Dishes Data (for horizontal scroll) ---
const popularDishes = [
  { name: 'Samosa', image: '/samosa.jpeg' },
  { name: 'Shev Puri', image: '/shevpuri.jpeg' },
  { name: 'Gulab Juice', image: '/pinkjuice.jpeg' },
  { name: 'Veg Thali', image: '/thali.jpeg' },
  { name: 'Batata Vada', image: '/batatavada.jpeg' }
];

// --- Testimonial Data (replaced with provided reviews) ---
const testimonials = [
  {
    quote: "Good Place for Family time. Pure Veg Cafe & Restaurant Managed by Udpi People. Just they have to work more on cleanliness and hygiene. Food here is Nice and tasty. Recommended.",
    name: "Darshan Anvekar",
    stars: 5
  },
  {
    quote: "Food here is good, they have variety of South Indian breakfast. Highly recommended if you love South Indian breakfast.",
    name: "Ruthvi Naik",
    stars: 5
  },
  {
    quote: "Good place for Udupi Veg cuisine. Channa masala, mushroom Bhaji, samosas, pulav, south Indian thali, mysore dosa, rawa dosa are some of the dishes you have to try.",
    name: "Aslesh Kamat",
    stars: 5
  },
  {
    quote: "For the price which they offer their products is exceptionally well. Their waiters are well behaved and maintain neatness.",
    name: "Salman Khan",
    stars: 5
  }
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// --- Hero Text Variants ---
const heroTextVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Hero Image Variants ---
const imageVariant1 = {
  hidden: { opacity: 0, y: 100, rotate: 3 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const imageVariant2 = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const imageVariant3 = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

// --- Main Home Component ---
function Home() {

  return (
    <div className="bg-white text-dark-text overflow-x-hidden overflow-hidden">

      {/* --- FIX: Added 'overflow-hidden' here to fix the double scrollbar --- */}
      <section className="container mx-auto px-6 min-h-[calc(100vh-80px)] 
                        grid grid-cols-1 md:grid-cols-5 gap-8 items-center overflow-hidden">
        
        {/* --- Left Side: Text --- */}
        <motion.div 
          className="md:col-span-2 text-center md:text-left mt-8 md:mt-0"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-dark-text font-heading"
            variants={heroTextVariants}
          >
            The Soul
          </motion.h1>
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-ocean-blue font-heading"
            variants={heroTextVariants}
          >
            of Goa
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 mt-6"
            variants={heroTextVariants}
          >
            Authentic Pure Veg Cuisine. A Timeless Tradition.
          </motion.p>
          <motion.div
            variants={heroTextVariants}
          >
            <Link 
              to="/menu" 
              className="inline-flex items-center mt-8 bg-sand text-ocean-blue px-8 py-3 rounded-full font-bold text-lg
                         hover:bg-light-cream transition duration-300 shadow-lg
                         transform hover:scale-105"
            >
              Explore Our Menu <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </motion.div>

        {/* --- Right Side: Image Grid --- */}
        <motion.div 
          className="md:col-span-3 h-[400px] md:h-full relative grid grid-cols-3 grid-rows-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
        >
          <motion.div 
            className="col-span-2 row-span-3 rounded-lg shadow-xl overflow-hidden"
            variants={imageVariant1}
          >
            <img src="/hero_img1.jpg" alt="Goan Food" className="w-full h-full object-cover" loading="eager" decoding="async" />
          </motion.div>
          
          <motion.div 
            className="col-span-1 row-span-2 col-start-3 rounded-lg shadow-lg overflow-hidden"
            variants={imageVariant2}
          >
            <img src="/hero_img2.jpg" alt="Goan Spices" className="w-full h-full object-cover" loading="eager" decoding="async" />
          </motion.div>

          <motion.div 
            className="col-span-1 row-span-1 col-start-3 row-start-3 bg-ocean-blue rounded-lg shadow-lg"
            variants={imageVariant3}
          >
            <img src="/hero_img3.jpg" alt="juices" className="w-full h-full object-cover" loading="eager" decoding="async" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- Horizontal Scroll Section --- */}
      <section className="py-20 bg-light-cream relative h-[500px] overflow-hidden">
        <div className="container mx-auto px-6 absolute top-20 left-1/2 -translate-x-1/2 z-10">
          <h2 className="text-4xl font-bold text-center text-dark-text font-heading">
            Our Popular Dishes
          </h2>
        </div>

        <motion.div 
          className="absolute top-[150px] left-0"
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="marquee flex space-x-8">
            {popularDishes.map((dish) => (
              <div key={dish.name} className="w-[350px] h-[300px] flex-shrink-0">
                <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden group">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover 
                                          transition-transform duration-500 
                                          group-hover:scale-110" />
                  <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-3xl font-bold text-white font-heading">{dish.name}</h3>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-[350px] h-[300px] flex-shrink-0">
              <Link to="/menu" className="w-full h-full rounded-lg shadow-xl bg-ocean-blue
                                          flex flex-col items-center justify-center text-white
                                          hover:bg-sand hover:text-ocean-blue transition-colors duration-300">
                <ArrowRight size={40} className="mb-4" />
                <span className="text-2xl font-bold font-heading">View Full Menu</span>
              </Link>
            </div>

            {/* --- Duplicated List for seamless loop --- */}
            {popularDishes.map((dish) => (
              <div key={`${dish.name}-duplicate`} className="w-[350px] h-[300px] flex-shrink-0">
                <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden group">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover 
                                          transition-transform duration-500 
                                          group-hover:scale-110" />
                  <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-3xl font-bold text-white font-heading">{dish.name}</h3>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-[350px] h-[300px] flex-shrink-0">
              <Link to="/menu" className="w-full h-full rounded-lg shadow-xl bg-ocean-blue
                                          flex flex-col items-center justify-center text-white
                                          hover:bg-sand hover:text-ocean-blue transition-colors duration-300">
                <ArrowRight size={40} className="mb-4" />
                <span className="text-2xl font-bold font-heading">View Full Menu</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Testimonials Section (replaced with carousel) --- */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* --- "Visit Us" CTA Section --- */}
      <motion.section
        className="py-20 bg-ocean-blue text-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10 font-heading">
            Come Dine With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center bg-white/10 p-6 rounded-lg">
              <MapPin className="text-sand mr-4 flex-shrink-0" size={40} />
              <div>
                <h3 className="text-xl font-bold text-left font-heading">Address</h3>
                <p className="text-left text-light-cream">
                  Railway Station Rd, opp. Municipal Building, Curchorem, Goa 403706
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white/10 p-6 rounded-lg">
              <Clock className="text-sand mr-4 flex-shrink-0" size={40} />
              <div>
                <h3 className="text-xl font-bold text-left font-heading">Opening Hours</h3>
                <p className="text-left text-light-cream">
                  Open 7 Days a Week, 6:00 AM – 9:00 PM
                </p>
              </div>
            </div>
          </div>
          <Link 
            to="/contact"
            className="inline-block mt-12 bg-sand text-ocean-blue px-10 py-4 rounded-full font-bold text-lg
                       hover:bg-light-cream transition duration-300 shadow-lg
                       transform hover:scale-105"
          >
            Get Directions
          </Link>
        </div>
      </motion.section>

    </div>
  );
}

export default Home;