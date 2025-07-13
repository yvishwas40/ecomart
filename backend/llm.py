import google.generativeai as genai

# Configure Gemini
genai.configure(api_key="AIzaSyCVID5HmTzoiGjEs6-hsBZFak1NHbOmzXo")  # Use os.getenv if loading securely

model = genai.GenerativeModel("gemini-1.5-flash")

def generate_eco_explanation(product_data: dict, score: str) -> str:
    """
    Generate eco explanation using Google Gemini API based on product attributes and score.
    """
    prompt = (
        f"The following product received an eco-score of {score}.\n"
        f"Here is the product metadata:\n"
        f"- Material: {product_data.get('material')}\n"
        f"- Packaging Type: {product_data.get('packaging_type')}\n"
        f"- Recyclable Packaging: {product_data.get('is_packaging_recyclable')}\n"
        f"- Recycled Content (%): {product_data.get('recycled_content_percent')}\n"
        f"- Biodegradable: {product_data.get('is_biodegradable')}\n"
        f"- Reusable: {product_data.get('is_reusable')}\n"
        f"- Manufactured In: {product_data.get('manufacturing_country')}\n\n"
        f"Please provide a short, professional explanation of why this product received an eco-score of {score}. "
        f"Keep it concise and clear for a product listing."
    )

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating eco explanation: {e}")
        return "Eco explanation could not be generated due to a system error."


def generate_greener_alternative(product_data: dict) -> str:
    """
    Generate greener alternative suggestions using Google Gemini API
    based on available product attributes from CSV.
    """
    prompt = f"""
You are an eco-conscious shopping assistant.

Suggest a greener alternative for a product with the following details:

- Product Name: {product_data.get("product_name")}
- Material: {product_data.get("material")}
- Packaging Type: {product_data.get("packaging_type")}
- Recyclable Packaging: {product_data.get("is_packaging_recyclable")}
- Biodegradable: {product_data.get("is_biodegradable")}
- Reusable: {product_data.get("is_reusable")}
- Recycled Content: {product_data.get("recycled_content_percent")}%
- Manufacturing Country: {product_data.get("manufacturing_country")}
- Eco Score: {product_data.get("eco_score")}
- Eco Explanation: {product_data.get("eco_explanation")}

Respond with 1 clear, practical suggestion that aligns with environmental sustainability. Keep it short and user-friendly 
If it is already A+ thank them for choosing a sustainable product.
"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating greener alternative: {e}")
        return "Consider reusable or recycled alternatives for a lower environmental impact."
