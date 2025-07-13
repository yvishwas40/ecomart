import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types/Product'
import EcoScoreBadge from './EcoScoreBadge'
import '../styles/ProductCard.css'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleEcoPointsEarned = () => {
    // Simulate earning eco points
    const points = product.eco_score === 'A+' ? 15 : 
                   product.eco_score === 'A' ? 12 : 
                   product.eco_score === 'B+' ? 10 : 
                   product.eco_score === 'B' ? 8 : 
                   product.eco_score === 'C+' ? 6 : 
                   product.eco_score === 'C' ? 4 : 2
    
    alert(`You earned ${points} eco points for viewing this sustainable product!`)
  }

  return (
    <div className="product-card">
      <Link to={`/product/${encodeURIComponent(product.product_name)}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image_link || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'} 
            alt={product.product_name}
            className="product-image"
          />
          <EcoScoreBadge score={product.eco_score} />
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.product_name}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
          
          <div className="eco-features">
            {product.is_biodegradable && <span className="eco-tag">🌱 Biodegradable</span>}
            {product.is_reusable && <span className="eco-tag">♻️ Reusable</span>}
            {product.is_packaging_recyclable && <span className="eco-tag">📦 Recyclable</span>}
          </div>
          
          <button 
            className="eco-points-btn"
            onClick={(e) => {
              e.preventDefault()
              handleEcoPointsEarned()
            }}
          >
            Earn Eco Points
          </button>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard