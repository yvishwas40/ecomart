from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import pandas as pd
import os
from pydantic import BaseModel
from llm import generate_greener_alternative, generate_eco_explanation
from routes.user_stats import router as user_stats_router


app = FastAPI(title="EcoMart Sustainability API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register your routes
app.include_router(user_stats_router)

class Product(BaseModel):
    product_name: str
    price: str
    category: str
    image_link: Optional[str] = None
    material: str
    packaging_type: str
    is_packaging_recyclable: bool
    is_biodegradable: bool
    is_reusable: bool
    recycled_content_percent: int
    manufacturing_country: str
    eco_score: str
    eco_explanation: str
    greener_alternative: Optional[str] = None

# Mock product data
MOCK_PRODUCTS = [
    
    {
        "product_name": "Recycled Paper Notebooks",
        "price": "9.99",
        "category": "electronics",
        "image_link": "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg",
        "material": "100% Recycled Paper",
        "packaging_type": "Minimal Cardboard",
        "is_packaging_recyclable": True,
        "is_biodegradable": True,
        "is_reusable": True,
        "recycled_content_percent": 100,
        "manufacturing_country": "Canada",
        "eco_score": "A+",
        "eco_explanation": "Made from 100% post-consumer recycled paper, saving trees and reducing landfill waste. Soy-based inks used for printing.",
        "greener_alternative": "Consider our Digital Note-Taking App to go completely paperless."
    }
]

def calculate_eco_score(product_data: dict) -> str:
    """Calculate eco score based on product attributes"""
    score = 0
    
    # Biodegradable products get high points
    if product_data.get('is_biodegradable', False):
        score += 25
    
    # Reusable products get points
    if product_data.get('is_reusable', False):
        score += 20
    
    # Recyclable packaging gets points
    if product_data.get('is_packaging_recyclable', False):
        score += 15
    
    # Recycled content percentage
    recycled_percent = product_data.get('recycled_content_percent', 0)
    score += recycled_percent * 0.3
    
    # Material-based scoring
    material = product_data.get('material', '').lower()
    if any(eco_material in material for eco_material in ['organic', 'bamboo', 'hemp', 'cork']):
        score += 20
    elif any(recycled_material in material for recycled_material in ['recycled', 'reclaimed']):
        score += 15
    
    # Convert score to letter grade
    if score >= 80:
        return 'A+'
    elif score >= 70:
        return 'A'
    elif score >= 60:
        return 'B+'
    elif score >= 50:
        return 'B'
    elif score >= 40:
        return 'C+'
    elif score >= 30:
        return 'C'
    else:
        return 'D'

# def generate_eco_explanation(product_data: dict, score: str) -> str:
#     """Generate explanation for eco score using rule-based logic"""
#     explanations = []
    
#     if product_data.get('is_biodegradable', False):
#         explanations.append("biodegradable and won't harm the environment")
    
#     if product_data.get('is_reusable', False):
#         explanations.append("designed for multiple uses, reducing waste")
    
#     if product_data.get('is_packaging_recyclable', False):
#         explanations.append("comes in recyclable packaging")
    
#     recycled_percent = product_data.get('recycled_content_percent', 0)
#     if recycled_percent > 0:
#         explanations.append(f"contains {recycled_percent}% recycled materials")
    
#     material = product_data.get('material', '').lower()
#     if 'organic' in material:
#         explanations.append("made from organic materials without harmful chemicals")
#     elif 'bamboo' in material:
#         explanations.append("bamboo is a fast-growing, renewable resource")
    
#     base_explanation = f"This product earned an {score} eco score because it is " + ", ".join(explanations) + "."
    
#     return base_explanation

# def generate_greener_alternative(product_data: dict) -> str:
#     """Generate greener alternative suggestions"""
#     alternatives = [
#         "Consider products with higher recycled content for even better environmental impact.",
#         "Look for locally-made alternatives to reduce transportation emissions.",
#         "Try reusable versions of this product to minimize waste over time.",
#         "Explore products made from renewable materials like bamboo or hemp.",
#         "Consider bulk purchasing to reduce packaging waste per unit."
#     ]
    
#     return random.choice(alternatives)

def load_products_from_csv():
    """Load products from CSV file if available, otherwise use mock data"""
    csv_path = "products.csv"

    if not os.path.exists(csv_path):
        print("CSV file not found. Using mock products.")
        return MOCK_PRODUCTS

    try:
        df = pd.read_csv(csv_path)
        products = []

        print(f"CSV Loaded: {len(df)} rows")

        for i, row in df.iterrows():
            try:
                product_dict = row.to_dict()

                # === Ensure Required Fields Exist and Cast Correctly ===
                product_dict['product_name'] = str(product_dict.get('product_name', '')).strip()
                product_dict['price'] = str(product_dict.get('price', '')).strip()
                product_dict['category'] = str(product_dict.get('category', '')).strip()
                product_dict['image_link'] = str(product_dict.get('image_link', '')).strip()
                product_dict['material'] = str(product_dict.get('material', '')).strip()
                product_dict['packaging_type'] = str(product_dict.get('packaging_type', '')).strip()
                product_dict['manufacturing_country'] = str(product_dict.get('manufacturing_country', '')).strip()

                # Convert booleans safely
                product_dict['is_packaging_recyclable'] = bool(product_dict.get('is_packaging_recyclable', False))
                product_dict['is_biodegradable'] = bool(product_dict.get('is_biodegradable', False))
                product_dict['is_reusable'] = bool(product_dict.get('is_reusable', False))

                # Convert recycled content percent safely
                try:
                    product_dict['recycled_content_percent'] = int(product_dict.get('recycled_content_percent', 0))
                except ValueError:
                    product_dict['recycled_content_percent'] = 0

                # === Add Calculated Fields ===
                eco_score = calculate_eco_score(product_dict)
                product_dict['eco_score'] = eco_score
                product_dict['eco_explanation'] = generate_eco_explanation(product_dict, eco_score)
                product_dict['greener_alternative'] = generate_greener_alternative(product_dict)

                # Optional check: ensure all required fields for Pydantic model are present
                Product(**product_dict)  # This will raise if invalid

                products.append(product_dict)

            except Exception as row_error:
                print(f"⚠️ Skipping row {i} due to error: {row_error}")

        print(f"✅ Successfully loaded {len(products)} products")
        return products if products else MOCK_PRODUCTS

    except Exception as e:
        print(f"❌ Error loading CSV: {e}")
        return MOCK_PRODUCTS

# Load products on startup
products_data = load_products_from_csv()

@app.get("/")
async def root():
    return {"message": "EcoMart Sustainability API", "version": "1.0.0"}

@app.get("/products/", response_model=List[Product])
async def get_all_products():
    """Get all products with eco scores and explanations"""
    return products_data

@app.get("/products/{category}", response_model=List[Product])
async def get_products_by_category(category: str):
    """Get products filtered by category"""
    filtered_products = [
        product for product in products_data 
        if product['category'].lower() == category.lower()
    ]
    
    if not filtered_products:
        raise HTTPException(status_code=404, detail=f"No products found in category: {category}")
    
    return filtered_products

@app.get("/product/{product_name}", response_model=Product)
async def get_product_by_name(product_name: str):
    """Get a specific product by name with detailed eco information"""
    product = next(
        (p for p in products_data if p['product_name'].lower() == product_name.lower()),
        None
    )
    
    if not product:
        raise HTTPException(status_code=404, detail=f"Product not found: {product_name}")
    
    return product

@app.get("/eco-score/{product_name}")
async def get_eco_score(product_name: str):
    """Get detailed eco score breakdown for a product"""
    product = next(
        (p for p in products_data if p['product_name'].lower() == product_name.lower()),
        None
    )
    
    if not product:
        raise HTTPException(status_code=404, detail=f"Product not found: {product_name}")
    
    # Calculate eco points
    eco_points = {
        'A+': 15, 'A': 12, 'B+': 10, 'B': 8, 'C+': 6, 'C': 4, 'D': 2
    }.get(product['eco_score'], 2)
    
    return {
        "product_name": product['product_name'],
        "eco_score": product['eco_score'],
        "eco_points": eco_points,
        "explanation": product['eco_explanation'],
        "greener_alternative": product.get('greener_alternative'),
        "sustainability_features": {
            "biodegradable": product['is_biodegradable'],
            "reusable": product['is_reusable'],
            "recyclable_packaging": product['is_packaging_recyclable'],
            "recycled_content_percent": product['recycled_content_percent']
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)