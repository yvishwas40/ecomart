import axios from 'axios'
import { Product } from '../types/Product'

const API_BASE_URL = 'http://localhost:8000'

// Mock data for development
const mockProducts: Product[] = [
  {
    product_name: "Organic Cotton T-Shirt",
    price: "24.99",
    category: "clothing",
    image_link: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
    material: "Organic Cotton",
    packaging_type: "Recyclable Cardboard",
    is_packaging_recyclable: true,
    is_biodegradable: true,
    is_reusable: true,
    recycled_content_percent: 0,
    manufacturing_country: "India",
    eco_score: "A+",
    eco_explanation: "Made from 100% organic cotton with minimal water usage and no harmful chemicals. Biodegradable and produced using renewable energy.",
    greener_alternative: "Consider our Hemp T-Shirt which requires 50% less water to produce and is even more durable."
  },
  {
    product_name: "Bamboo Kitchen Utensil Set",
    price: "19.99",
    category: "kitchen",
    image_link: "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg",
    material: "Bamboo",
    packaging_type: "Compostable Packaging",
    is_packaging_recyclable: true,
    is_biodegradable: true,
    is_reusable: true,
    recycled_content_percent: 0,
    manufacturing_country: "Vietnam",
    eco_score: "A",
    eco_explanation: "Bamboo is a fast-growing, renewable resource that's naturally antibacterial. This set replaces plastic utensils and is fully compostable.",
    greener_alternative: "Our Reclaimed Wood Utensil Set uses wood from sustainable forestry practices."
  },
  {
    product_name: "Organic Quinoa",
    price: "8.99",
    category: "grocery",
    image_link: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg",
    material: "Organic Quinoa",
    packaging_type: "Recyclable Paper",
    is_packaging_recyclable: true,
    is_biodegradable: true,
    is_reusable: false,
    recycled_content_percent: 80,
    manufacturing_country: "Peru",
    eco_score: "A+",
    eco_explanation: "Certified organic quinoa grown without pesticides. Packaging made from 80% recycled paper. Supports fair trade farming practices.",
    greener_alternative: "Try our locally-grown organic millet which has a lower carbon footprint due to reduced transportation."
  },
  {
    product_name: "Recycled Plastic Water Bottle",
    price: "12.99",
    category: "kitchen",
    image_link: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
    material: "Recycled Plastic",
    packaging_type: "Minimal Cardboard",
    is_packaging_recyclable: true,
    is_biodegradable: false,
    is_reusable: true,
    recycled_content_percent: 100,
    manufacturing_country: "USA",
    eco_score: "B+",
    eco_explanation: "Made from 100% recycled plastic bottles, preventing waste from entering landfills. Durable and reusable design reduces single-use plastic consumption.",
    greener_alternative: "Consider our Stainless Steel Water Bottle which lasts longer and doesn't contain any plastic."
  },
  {
    product_name: "Solar-Powered Garden Light",
    price: "29.99",
    category: "home",
    image_link: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    material: "Recycled Aluminum",
    packaging_type: "Recyclable Cardboard",
    is_packaging_recyclable: true,
    is_biodegradable: false,
    is_reusable: true,
    recycled_content_percent: 75,
    manufacturing_country: "China",
    eco_score: "A-",
    eco_explanation: "Solar-powered LED light reduces electricity consumption. Made with 75% recycled aluminum and designed for long-term outdoor use.",
    greener_alternative: "Our Wind-Powered Garden Light uses renewable wind energy and has a longer lifespan."
  },
  {
    product_name: "Biodegradable Cleaning Spray",
    price: "6.99",
    category: "home",
    image_link: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
    material: "Plant-based Formula",
    packaging_type: "Recyclable Plastic",
    is_packaging_recyclable: true,
    is_biodegradable: true,
    is_reusable: false,
    recycled_content_percent: 50,
    manufacturing_country: "USA",
    eco_score: "A",
    eco_explanation: "Plant-based formula breaks down naturally without harming waterways. Packaging made from 50% recycled plastic.",
    greener_alternative: "Try our Concentrated Refill Tablets that reduce packaging waste by 90%."
  }
]

export const apiService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/`)
      return response.data
    } catch (error) {
      console.log('Using mock data - API not available')
      return mockProducts
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${category}`)
      return response.data
    } catch (error) {
      console.log('Using mock data - API not available')
      return mockProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }
  },

  async getProduct(productName: string): Promise<Product> {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${encodeURIComponent(productName)}`)
      return response.data
    } catch (error) {
      console.log('Using mock data - API not available')
      const product = mockProducts.find(p => p.product_name === productName)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    }
  }
}