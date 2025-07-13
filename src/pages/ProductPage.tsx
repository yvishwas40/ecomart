import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import { apiService } from '../services/apiService'
import EcoScoreBadge from '../components/EcoScoreBadge'
import '../styles/ProductPage.css'

const ProductPage: React.FC = () => {
  const { productName } = useParams<{ productName: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productName) return
      
      try {
        setLoading(true)
        const data = await apiService.getProduct(decodeURIComponent(productName))
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productName])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  const ecoPoints = product.eco_score === 'A+' ? 15 : 
                   product.eco_score === 'A' ? 12 : 
                   product.eco_score === 'B+' ? 10 : 
                   product.eco_score === 'B' ? 8 : 
                   product.eco_score === 'C+' ? 6 : 
                   product.eco_score === 'C' ? 4 : 2

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-details">
          <div className="product-images">
            <img 
              src={product.image_link || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'} 
              alt={product.product_name}
              className="main-image"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.product_name}</h1>
            <div className="product-score-large">{product.eco_score}</div>
            <div className="product-rating">
              <div className="stars">★★★★☆</div>
              <span className="review-count">(127 reviews)</span>
            </div>
            
            <div className="price-section">
              <span className="current-price">${product.price}</span>
              <span className="original-price">${(parseFloat(product.price) * 1.2).toFixed(2)}</span>
              <span className="discount">Save 20%</span>
            </div>

            <div className="eco-section">
              <div className="eco-score-display">
                <EcoScoreBadge score={product.eco_score} />
                <div className="eco-info">
                  <h3>Sustainability Score</h3>
                  <p>{product.eco_explanation}</p>
                  <div className="eco-points">
                    <span className="points-icon">🌱</span>
                    <span>Earn {ecoPoints} eco points with this purchase</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-features">
              <h3>Eco Features</h3>
              <ul className="features-list">
                <li className={product.is_biodegradable ? 'feature-yes' : 'feature-no'}>
                  {product.is_biodegradable ? '✅' : '❌'} Biodegradable
                </li>
                <li className={product.is_reusable ? 'feature-yes' : 'feature-no'}>
                  {product.is_reusable ? '✅' : '❌'} Reusable
                </li>
                <li className={product.is_packaging_recyclable ? 'feature-yes' : 'feature-no'}>
                  {product.is_packaging_recyclable ? '✅' : '❌'} Recyclable Packaging
                </li>
                <li>
                  <span className="recycled-content">
                    ♻️ {product.recycled_content_percent}% Recycled Content
                  </span>
                </li>
              </ul>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tab-content">
            <div className="tab-panel">
              <h3>Product Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{product.category}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Material:</span>
                  <span className="detail-value">{product.material}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Packaging:</span>
                  <span className="detail-value">{product.packaging_type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Manufacturing Country:</span>
                  <span className="detail-value">{product.manufacturing_country}</span>
                </div>
              </div>
            </div>

            {product.greener_alternative && (
              <div className="greener-alternative">
                <h3>🌿 Greener Alternative Recommendation</h3>
                <div className="alternative-card">
                  <p>{product.greener_alternative}</p>
                  <button className="view-alternative-btn">View Alternative</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage