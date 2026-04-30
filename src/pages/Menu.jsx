import React, { useState, useMemo, useEffect } from 'react' // Import useEffect
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'

// --- Menu Data (Updated from Image) ---
const menuData = [
  {
    category: "Breakfast & Snacks",
    items: [
      { name: "Seera", description: "Sweet semolina dessert.", price: 40, image: "/dishes/seera.jpg" },
      { name: "Upma Plate", description: "Savory semolina porridge.", price: 30, image: "/dishes/upma.jpg" },
      { name: "Buns", description: "Sweet fried banana bread.", price: 20, image: "/dishes/buns.jpg" },
      { name: "Samosa Plate", description: "Crispy savory pastries.", price: 50, image: "/dishes/samosa.jpg" },
      { name: "Potato Wada Plate", description: "Fried potato dumplings.", price: 50, image: "/dishes/potato-wada.jpg" },
      { name: "Idli Plate", description: "Steamed rice cakes.", price: 50, image: "/dishes/idli.jpg" },
      { name: "Idli (S)", description: "Single idli serving.", price: 30, image: "/dishes/idli-s.jpg" },
      { name: "Urid Wada Plate", description: "Crispy lentil donuts.", price: 80, image: "/dishes/urid-wada.jpg" },
      { name: "Idli Wada", description: "Mix of idli and wada.", price: 80, image: "/dishes/idli-wada.jpg" },
      { name: "Single Idli Wada", description: "One idli and one wada.", price: 70, image: "/dishes/single-idli-wada.jpg" }
    ]
  },
  {
    category: "Bhaji & Plates",
    items: [
      { name: "Patal Bhaji", description: "Coconut based spicy gravy.", price: 45, image: "/dishes/patal-bhaji.jpg" },
      { name: "Mix Bhaji", description: "Mixed vegetable curry.", price: 45, image: "/dishes/mix-bhaji.jpg" },
      { name: "Potato Bhaji", description: "Spiced potato preparation.", price: 45, image: "/dishes/potato-bhaji.jpg" },
      { name: "Special Kurma Bhaji", description: "Rich vegetable kurma.", price: 45, image: "/dishes/kurma.jpg" },
      { name: "Chana Masala", description: "Spiced chickpea curry.", price: 60, image: "/dishes/chana.jpg" },
      { name: "Puri Plate", description: "Fried bread with bhaji.", price: 40, image: "/dishes/puri.jpg" },
      { name: "Dhahi (Curd) Wada", description: "Lentil donuts in yogurt.", price: 80, image: "/dishes/dahi-wada.jpg" },
      { name: "Single Dhahi Wada", description: "Single serving in yogurt.", price: 40, image: "/dishes/single-dahi.jpg" },
      { name: "Onion Bajeya Plate", description: "Crispy onion fritters.", price: 40, image: "/dishes/onion-bhaji.jpg" },
      { name: "Mirchi Bhjeya", description: "Spicy chili fritters.", price: 30, image: "/dishes/mirchi.jpg" }
    ]
  },
  {
    category: "Dosa & Uttappa",
    items: [
      { name: "Paper Masala Dosa", description: "Thin crepe (Available after 3:30 PM).", price: 100, image: "/dishes/paper-masala.jpg" },
      { name: "Rawa Masala Dosa", description: "Semolina crepe with filling.", price: 100, image: "/dishes/rawa-masala.jpg" },
      { name: "Rawa Plain", description: "Crispy semolina crepe.", price: 100, image: "/dishes/rawa-plain.jpg" },
      { name: "Masala Dosa", description: "Crepe with potato filling.", price: 80, image: "/dishes/masala-dosa.jpg" },
      { name: "Plain Dosa", description: "Simple rice crepe.", price: 70, image: "/dishes/plain-dosa.jpg" },
      { name: "Onion Uttappa", description: "Savory pancake with onions.", price: 80, image: "/dishes/uttappa.jpg" },
      { name: "Paper Plain Dosa", description: "Extra thin plain crepe.", price: 90, image: "/dishes/paper-plain.jpg" },
      { name: "Veg Tomato Omlet", description: "Gram flour veg omelet.", price: 80, image: "/dishes/veg-omlet.jpg" },
      { name: "Mysore Masala Dosa", description: "Spicy chutney with filling.", price: 100, image: "/dishes/mysore-masala.jpg" }
    ]
  },
  {
    category: "Meals & Drinks",
    items: [
      { name: "Rice Plate", description: "Full meal (11:30 AM-3:30 PM | 7:00 PM-9:00 PM).", price: 120, image: "/dishes/rice-plate.jpg" },
      { name: "Extra Rice", description: "Additional rice serving.", price: 40, image: "/dishes/extra-rice.jpg" },
      { name: "Tea", description: "Hot milk tea.", price: 20, image: "/dishes/tea.jpg" },
      { name: "Special Tea", description: "Premium brewed tea.", price: 30, image: "/dishes/special-tea.jpg" },
      { name: "Nescafe", description: "Instant coffee.", price: 30, image: "/dishes/nescafe.jpg" }
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

  const allMenuItems = useMemo(() => 
    menuData.flatMap(category => 
      category.items.map(item => ({...item, category: category.category}))
    )
  , []);

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return allMenuItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); 
  }, [searchQuery, allMenuItems]);

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
  
  const handleSuggestionClick = (itemName) => {
    setSearchQuery(itemName);
  };

  const handleCategoryClick = (categoryName) => {
    setOpenCategories(prevCategories => {
      if (prevCategories.includes(categoryName)) {
        return prevCategories.filter(cat => cat !== categoryName);
      } else {
        return [...prevCategories, categoryName];
      }
    });
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const categoriesWithResults = filteredMenuData.map(category => category.category);
      setOpenCategories(categoriesWithResults);
    } else {
      setOpenCategories([]);
    }
  }, [searchQuery, filteredMenuData]); 

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      
      <motion.h1 
        className="text-5xl font-bold text-center text-dark-text mb-6"
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
      >
        Janta - Udupi Restaurant
      </motion.h1>
      <p className="text-center text-gray-500 mb-10 font-medium">Pure Vegetarian</p>
      
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
                
                <button 
                  onClick={() => handleCategoryClick(category.category)}
                  className="w-full flex justify-between items-center p-5 text-left
                             bg-gray-50 hover:bg-light-cream transition-colors"
                >
                  <h2 className="text-2xl font-bold text-ocean-blue">
                    {category.category}
                  </h2>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                  >
                    <ChevronDown className="text-ocean-blue" size={24} />
                  </motion.div>
                </button>

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
