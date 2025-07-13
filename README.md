# EcoMart - Sustainable E-commerce Platform

A fully functional e-commerce web application that replicates Walmart's design while focusing on sustainability. Each product displays eco scores, explanations, and greener alternatives based on comprehensive metadata.

## 🌱 Features

- **Walmart-style UI/UX** - Familiar shopping experience with sustainability focus
- **Eco Score System** - A+ to D ratings based on environmental impact
- **Smart Recommendations** - AI-powered greener alternatives
- **Comprehensive Product Data** - Material, packaging, recyclability info
- **Eco Points System** - Gamified sustainable shopping rewards
- **Responsive Design** - Works perfectly on all devices
- **Category Filtering** - Browse by Grocery, Clothing, Kitchen, etc.
- **Eco Dashboard** - Track your sustainability impact

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **Pure CSS** (no frameworks) for Walmart-like styling
- **Vite** for fast development

### Backend
- **FastAPI** with Python
- **Pandas** for CSV data processing
- **Pydantic** for data validation
- **Uvicorn** ASGI server
- **CORS** enabled for frontend integration

### Data & Deployment
- **CSV-based** product database
- **Docker & Docker Compose** for containerization
- **Rule-based** eco scoring algorithm
- **Mock LLM** integration ready for Gemini API

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone and start the application:**
```bash
git clone https://github.com/yvishwas40/ecomart.git
npm install
npm run dev
```

2. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Manual Setup

1. **Frontend Setup:**
```bash
npm install
npm run dev
```

2. **Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📊 Product Data Structure

Each product includes comprehensive sustainability metadata:

```csv
product_name,price,category,image_link,material,packaging_type,
is_packaging_recyclable,is_biodegradable,is_reusable,
recycled_content_percent,manufacturing_country
```

## 🎯 Eco Scoring Algorithm

The system calculates eco scores based on:

- **Biodegradability** (25 points)
- **Reusability** (20 points) 
- **Recyclable Packaging** (15 points)
- **Recycled Content %** (0.3 points per %)
- **Sustainable Materials** (20 points for organic/bamboo/hemp)
- **Recycled Materials** (15 points)

**Score Ranges:**
- A+: 80+ points
- A: 70-79 points
- B+: 60-69 points
- B: 50-59 points
- C+: 40-49 points
- C: 30-39 points
- D: <30 points

## 🌿 API Endpoints

- `GET /products/` - List all products
- `GET /products/{category}` - Filter by category
- `GET /product/{name}` - Get specific product details
- `GET /eco-score/{name}` - Detailed eco score breakdown

## 🎨 Design Philosophy

The application replicates Walmart's familiar blue and yellow color scheme while adding green sustainability accents. The design focuses on:

- **Familiar Navigation** - Walmart-style header and categories
- **Product Cards** - Clean layout with prominent eco badges
- **Sustainability First** - Eco scores and features prominently displayed
- **Mobile Responsive** - Optimized for all screen sizes
- **Performance** - Fast loading with optimized images

## 🔮 Future Enhancements

- **Gemini AI Integration** - Real-time eco explanations and recommendations
- **User Accounts** - Personalized eco dashboards and purchase history
- **PostgreSQL Database** - Scalable data storage
- **Advanced Filtering** - Price, eco score, and feature filters
- **Shopping Cart** - Full e-commerce functionality
- **Payment Integration** - Sustainable checkout process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌍 Environmental Impact

By choosing EcoMart, users can:
- Make informed sustainable purchasing decisions
- Track their environmental impact
- Discover greener alternatives
- Earn rewards for eco-friendly choices
- Contribute to a more sustainable future

---

**Built with 💚 for a sustainable future**
