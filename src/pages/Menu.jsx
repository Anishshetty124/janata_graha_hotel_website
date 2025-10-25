import React, { useState, useMemo, useEffect } from 'react' // Import useEffect
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'

// --- Menu Data (in-code) ---
// CHANGED: Image paths are now permanent, static URLs from Wikimedia Commons
const menuData = [
  {
    category: "Breakfast",
    items: [
      { name: "Masala Dosa", description: "Crispy rice crepe, spiced potato filling...", price: 120, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Masala_Dosa_with_Sambar_and_Chutney.jpg/1280px-Masala_Dosa_with_Sambar_and_Chutney.jpg" },
      { name: "Idli Sambar", description: "Steamed rice cakes served with lentil soup.", price: 80, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Idli_Sambar_and_Vada.JPG/1280px-Idli_Sambar_and_Vada.JPG" },
      { name: "Puri Bhaji", description: "Fluffy fried bread with spiced potato curry.", price: 110, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Puri_Bhaji_North_India.jpg/1280px-Puri_Bhaji_North_India.jpg" }
    ]
  },
  {
    category: "Goan Lunch Specials",
    items: [
      { name: "Goan Fish Thali", description: "Complete meal with fish curry, rice, sol kadi.", price: 250, image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Goan_Fish_Thali.jpg" },
      { name: "Prawn Curry Rice", description: "Classic Goan specialty, coconut-based.", price: 300, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Goan_Prawn_Curry.jpg/1024px-Goan_Prawn_Curry.jpg" },
      { name: "Kingfish Rava Fry", description: "Semolina-coated, shallow-fried kingfish.", price: 400, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Goan_Kingfish_Fry.jpg/1280px-Goan_Kingfish_Fry.jpg" }
    ]
  },
  {
    category: "Appetizers",
    items: [
      { name: "Veg Spring Rolls", description: "Crispy fried rolls stuffed with vegetables.", price: 150, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vegetable_Spring_Rolls.jpg/1280px-Vegetable_Spring_Rolls.jpg" },
      { name: "Paneer Tikka", description: "Marinated cottage cheese cubes grilled.", price: 220, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Paneer_Tikka_Seekh_Kebab.jpg/1280px-Paneer_Tikka_Seekh_Kebab.jpg" }
    ]
  }
];

// --- Animation Variants ---
const itemCardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const accordionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: 'easeInOut' } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } }
};

const suggestionsVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};


function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState([]); 

  // A flat list of ALL items, used for search recommendations
  const allMenuItems = useMemo(() => 
    menuData.flatMap(category => 
      category.items.map(item => ({...item, category: category.category}))
    )
  , []);

  // Filtered list for search recommendations dropdown
  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return allMenuItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Show top 5 suggestions
  }, [searchQuery, allMenuItems]);

  // Filtered menu *structure* for the accordions
  const filteredMenuData = useMemo(() => {
    if (!searchQuery) return menuData;

    return menuData.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [searchQuery]);
  
  // Handle clicking a suggestion
  const handleSuggestionClick = (itemName) => {
    setSearchQuery(itemName);
  };

  // Click handler now adds/removes from the array
  const handleCategoryClick = (categoryName) => {
    setOpenCategories(prevCategories => {
      if (prevCategories.includes(categoryName)) {
        // It's open, so close it (filter it out)
        return prevCategories.filter(cat => cat !== categoryName);
      } else {
        // It's closed, so open it (add it)
        return [...prevCategories, categoryName];
      }
    });
  };

  // This effect syncs the open accordions with the search query
  useEffect(() => {
    if (searchQuery.trim()) {
      // If user is searching, find all categories with results and open them
      const categoriesWithResults = filteredMenuData.map(category => category.category);
      setOpenCategories(categoriesWithResults);
    } else {
      // If search is empty, close all accordions
      setOpenCategories([]);
    }
  }, [searchQuery, filteredMenuData]); // Re-run when search or filtered data changes

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      
      <motion.h1 
        className="text-5xl font-bold text-center text-dark-text mb-6"
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
      >
        Our Full Menu
      </motion.h1>
      
      {/* --- Animated Search Bar --- */}
      <motion.div 
        className="relative max-w-lg mx-auto mb-16 z-20"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <input 
            type="text"
            placeholder="Search for a dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 pl-12 rounded-full bg-white shadow-lg
                       border border-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-ocean-blue"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* --- Search Recommendations Dropdown --- */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div 
              className="absolute top-full w-full mt-2 bg-white shadow-xl rounded-lg overflow-hidden"
              variants={suggestionsVariants}
              initial="hidden" animate="visible" exit="hidden"
            >
              {suggestions.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSuggestionClick(item.name)}
                  className="w-full text-left px-5 py-3 hover:bg-light-cream text-dark-text"
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Accordion Menu Sections --- */}
      <div className="space-y-4 max-w-4xl mx-auto z-10">
        
        {filteredMenuData.length > 0 ? (
          filteredMenuData.map((category) => {
            const isOpen = openCategories.includes(category.category);
            return (
              <section key={category.category} className="bg-white rounded-lg shadow-md overflow-hidden">
                
                {/* Accordion Header Button */}
                <button 
                  onClick={() => handleCategoryClick(category.category)}
                  className="w-full flex justify-between items-center p-5 text-left
                             bg-gray-50 hover:bg-light-cream transition-colors"
                >
                  <h2 className="text-2xl font-bold text-ocean-blue">
                    {category.category}
                  </h2>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }} // Animate chevron
                  >
                    <ChevronDown className="text-ocean-blue" size={24} />
                  </motion.div>
                </button>

                {/* Accordion Content (Dishes) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
                      >
                        <AnimatePresence>
                          {category.items.map((item) => (
                            <motion.div
                              key={item.name}
                              variants={itemCardVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              layout
                              className="bg-white rounded-lg shadow-lg overflow-hidden transform 
                                         hover:shadow-xl transition-shadow duration-300"
                            >
                              <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                              <div className="p-5">
                                <h3 className="text-xl font-bold text-dark-text mb-1">{item.name}</h3>
                                <p className="text-gray-600 text-sm mb-3 h-10">{item.description}</p>
                                <p className="text-xl font-semibold text-ocean-blue">₹{item.price}</p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })
        ) : (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-semibold text-gray-700">No dishes found</h3>
            <p className="text-gray-500 mt-2">Try a different search term!</p>
          </motion.div>
        )}
      </div>
      
    </div>
  )
}

export default Menu