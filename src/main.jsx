import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css' // Imports Tailwind styles

// Our Components
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
// import Order from './pages/Order.jsx' // <-- DELETE THIS LINE
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

// This defines all your pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu /> },
      // { path: '/order', element: <Order /> }, // <-- DELETE THIS LINE
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)