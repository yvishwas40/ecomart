import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { Product } from '../types/Product'
import { apiService } from '../services/apiService'
import '../styles/HomePage.css'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await apiService.getProducts()
        
        let filteredProducts = data
        if (searchTerm) {
          filteredProducts = data.filter(product => 
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        
        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchTerm])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading sustainable products...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Shop Sustainably, Live Better</h1>
            <p>Discover eco-friendly products with transparent sustainability scores and greener alternatives.</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">A+</span>
                <span className="stat-label">Eco Rated Products</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Transparency</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">🌍</span>
                <span className="stat-label">Planet Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {searchTerm && (
          <div className="search-results-header">
            <h2>Search results for "{searchTerm}" ({products.length} items)</h2>
          </div>
        )}

        <div className="featured-categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            <div className="category-card">
              <img src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg" alt="Grocery" />
              <h3>Grocery</h3>
              <p>Organic & sustainable food</p>
            </div>
            <div className="category-card">
              <img src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg" alt="Clothing" />
              <h3>Clothing</h3>
              <p>Eco-friendly fashion</p>
            </div>
            <div className="category-card">
              <img src="https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg" alt="Kitchen" />
              <h3>Kitchen</h3>
              <p>Sustainable kitchenware</p>
            </div>
            <div className="category-card">
              <img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" alt="Home" />
              <h3>Home & Garden</h3>
              <p>Green living essentials</p>
            </div>
          </div>
        </div>

        <div className="products-section">
          <h2>Featured Sustainable Products</h2>
          <div className="products-grid">
            {products.slice(0, 12).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage