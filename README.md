# Pokémon App

A simple full-stack application with a Python FastAPI backend and a clean, simple frontend UI for browsing Pokémon data.

## Project Structure

```
pokemon/
├── backend/          # Python FastAPI backend
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
├── frontend/         # HTML/CSS/JavaScript frontend
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
├── venv/            # Python virtual environment
└── README.md        # This file
```

## Quick Start

### 1. Backend Setup

Navigate to the backend directory and follow the setup instructions:

👉 **[Backend README](backend/README.md)**

**Quick commands:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
uvicorn app:app --reload
```

The backend will run at `http://localhost:8000`

### 2. Frontend Setup

Navigate to the frontend directory and follow the setup instructions:

👉 **[Frontend README](frontend/README.md)**

**Quick commands:**
```bash
cd frontend
python3 -m http.server 8080
# Then open http://localhost:8080 in your browser
```

## Features

- **List View**: Browse a grid of the first 20 Pokémon with images
- **Detail View**: View detailed information about a specific Pokémon
- **Clean UI**: Simple, responsive design with smooth navigation
- **RESTful API**: Well-structured backend API with interactive documentation

## API Endpoints

- `GET /api/pokemon` - Returns list of Pokémon
- `GET /api/pokemon/{name}` - Returns details for one Pokémon

For detailed API documentation, see the [Backend README](backend/README.md) or visit `http://localhost:8000/docs` when the backend is running.

## External API

This application uses the [PokéAPI](https://pokeapi.co/) which is free and requires no authentication.

## Technology Stack

**Backend:**
- Python 3
- FastAPI
- Uvicorn
- httpx

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
