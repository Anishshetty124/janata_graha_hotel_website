import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop' 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white"> 
      <ScrollToTop />
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default App