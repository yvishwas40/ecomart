FROM node:18-alpine as frontend-build

WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy frontend build
COPY --from=frontend-build /app/dist ./frontend/dist

# Copy CSV data
COPY backend/products.csv ./

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]