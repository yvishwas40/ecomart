export interface Product {
  product_name: string
  price: string
  category: string
  image_link?: string
  material: string
  packaging_type: string
  is_packaging_recyclable: boolean
  is_biodegradable: boolean
  is_reusable: boolean
  recycled_content_percent: number
  manufacturing_country: string
  eco_score: string
  eco_explanation: string
  greener_alternative?: string
}