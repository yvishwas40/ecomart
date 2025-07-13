import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // For now, redirect to home with search term
      navigate(`/?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-6a0f/k2-_fb0a4b96-dde2-4a1c-9b7d-7b5b0b8b0b8b.v1.png" alt="EcoMart" className="logo-img" />
              <span className="logo-text">EcoMart</span>
            </Link>
            
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search everything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>

            <div className="header-actions">
              <Link to="/eco-dashboard" className="eco-points">
                <span className="eco-icon">🌱</span>
                <span>Eco Points</span>
              </Link>
              <button className="cart-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="cart-count">0</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="nav-bar">
        <div className="container">
          <ul className="nav-links">
            <li><Link to="/category/grocery">Grocery</Link></li>
            <li><Link to="/category/clothing">Clothing</Link></li>
            <li><Link to="/category/kitchen">Kitchen</Link></li>
            <li><Link to="/category/electronics">Electronics</Link></li>
            <li><Link to="/category/home">Home & Garden</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header