# 🏔️ Uttarakhand Tourism Guide

**Full Stack Internship Project – Week 4: Backend & API Development**

A React + Node.js/Express tourism platform for discovering destinations, homestays, and AI-powered travel recommendations across Uttarakhand.

---

## Project Structure

```
uttarakhand-tourism/
│
├── backend/                         # Node.js + Express REST API
│   ├── controllers/
│   │   └── destinationsController.js  # Business logic for all endpoints
│   ├── routes/
│   │   └── destinations.js           # Route definitions
│   ├── middleware/
│   │   ├── errorHandler.js           # Global Express error handler
│   │   └── requestLogger.js          # Per-request console logger
│   ├── data/
│   │   └── destinations.js           # In-memory data store + CRUD helpers
│   ├── server.js                     # Express app entry point
│   ├── package.json
│   ├── .env.example                  # Environment variable template
│   └── .gitignore
│
├── src/                             # React frontend (Vite)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   └── ui/                      # Reusable UI components
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       ├── Toast.jsx
│   │       ├── Loader.jsx
│   │       └── index.js
│   ├── context/
│   │   └── ThemeContext.jsx          # Dark/light mode (localStorage)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx          # ← NEW: API-connected destinations page
│   │   ├── Dashboard.jsx             # ← UPDATED: pulls live count from API
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   └── ComponentsDemo.jsx
│   ├── services/
│   │   └── api.js                    # ← NEW: centralised fetch wrapper
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example                     # Frontend Vite env template
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description | Success |
|--------|----------|-------------|---------|
| `GET` | `/api/health` | Health check | 200 |
| `GET` | `/api/destinations` | All destinations | 200 |
| `GET` | `/api/destinations/search?q=` | Search by name/location/description | 200 |
| `GET` | `/api/destinations/category/:category` | Filter by category | 200 |
| `GET` | `/api/destinations/:id` | Single destination | 200 |
| `POST` | `/api/destinations` | Create destination | 201 |
| `PUT` | `/api/destinations/:id` | Update destination | 200 |
| `DELETE` | `/api/destinations/:id` | Delete destination | 204 |

### Available categories
`hill-station` · `pilgrimage` · `adventure` · `wildlife` · `trekking` · `spiritual`

### Error responses

| Status | When |
|--------|------|
| `400` | Invalid input / missing required fields |
| `404` | Destination id not found / unknown route |
| `500` | Unexpected server error |

---

## Setup & Running

### Prerequisites
- Node.js >= 18
- npm >= 9

### 1. Backend

```bash
cd backend
cp .env.example .env       # create env file (defaults are fine for dev)
npm install
npm run dev                # starts nodemon on http://localhost:5000
```

### 2. Frontend

```bash
# from the project root (uttarakhand-tourism/)
cp .env.example .env       # optional – defaults to http://localhost:5000/api
npm install
npm run dev                # starts Vite on http://localhost:5173
```

### 3. Open

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| Health check | http://localhost:5000/api/health |
| All destinations | http://localhost:5000/api/destinations |

---

## Quick API Tests (curl)

```bash
# Health check
curl http://localhost:5000/api/health

# Get all destinations
curl http://localhost:5000/api/destinations

# Get by id
curl http://localhost:5000/api/destinations/1

# Search
curl "http://localhost:5000/api/destinations/search?q=trek"

# Filter by category
curl http://localhost:5000/api/destinations/category/adventure

# Create
curl -X POST http://localhost:5000/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lansdowne",
    "location": "Pauri District, Garhwal",
    "category": "hill-station",
    "description": "A quiet, unspoiled hill station with dense oak forests.",
    "image": "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800",
    "rating": 4.4,
    "bestSeason": "October – June"
  }'

# Update
curl -X PUT http://localhost:5000/api/destinations/11 \
  -H "Content-Type: application/json" \
  -d '{ "rating": 4.6 }'

# Delete
curl -X DELETE http://localhost:5000/api/destinations/11
```

---

## Week Roadmap

| Week | Topic | Status |
|------|-------|--------|
| 1 | Project setup | ✅ |
| 2 | React + Vite + Tailwind frontend skeleton | ✅ |
| 3 | Reusable UI component library | ✅ |
| 4 | Node.js + Express backend, REST APIs | ✅ |
| 5 | MongoDB integration | 🔜 |
| 6 | Authentication (JWT) | 🔜 |
| 7 | AI features | 🔜 |
| 8 | Deployment | 🔜 |
