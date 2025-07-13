import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'
import EcoDashboard from './pages/EcoDashboard'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:productName" element={<ProductPage />} />
          <Route path="/eco-dashboard" element={<EcoDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App