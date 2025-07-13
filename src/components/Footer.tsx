import React from 'react'
import '../styles/Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About EcoMart</h3>
            <p>Your sustainable shopping destination. We help you make eco-friendly choices with every purchase.</p>
            <div className="eco-stats">
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Eco Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">1M+</span>
                <span className="stat-label">CO2 Saved (kg)</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Sustainability</h3>
            <ul>
              <li><a href="#">Eco Score Guide</a></li>
              <li><a href="#">Green Alternatives</a></li>
              <li><a href="#">Recycling Program</a></li>
              <li><a href="#">Carbon Neutral Shipping</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 EcoMart. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer