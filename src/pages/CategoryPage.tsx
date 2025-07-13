import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { Product } from '../types/Product'
import { apiService } from '../services/apiService'
import '../styles/CategoryPage.css'

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return
      
      try {
        setLoading(true)
        const data = await apiService.getProductsByCategory(category)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price)
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price)
      case 'eco-score':
        const scoreOrder = { 'A+': 7, 'A': 6, 'B+': 5, 'B': 4, 'C+': 3, 'C': 2, 'D': 1 }
        return (scoreOrder[b.eco_score as keyof typeof scoreOrder] || 0) - (scoreOrder[a.eco_score as keyof typeof scoreOrder] || 0)
      default:
        return a.product_name.localeCompare(b.product_name)
    }
  })

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading {category} products...</p>
      </div>
    )
  }

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>{(category ?? '').charAt(0).toUpperCase() + (category ?? '').slice(1)} Products</h1>
          <p>Discover sustainable {category} products with transparent eco ratings</p>
        </div>

        <div className="category-controls">
          <div className="results-count">
            <span>{products.length} products found</span>
          </div>
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="eco-score">Eco Score</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {sortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="no-products">
            <h3>No products found in this category</h3>
            <p>Try browsing other categories or check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage