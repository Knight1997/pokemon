# Pokémon API Backend

A Python FastAPI backend application that provides REST endpoints to fetch Pokémon data from the PokéAPI.

## Features

- **List Endpoint**: Get a list of the first 20 Pokémon
- **Detail Endpoint**: Get detailed information about a specific Pokémon including:
  - Name
  - Image (official artwork or default sprite)
  - Type(s)
  - Height (in decimeters)
  - Weight (in hectograms)
  - Abilities

## API Endpoints

### 1. Get Pokémon List
```
GET /api/pokemon
```
Returns a list of the first 20 Pokémon.

**Response:**
```json
{
  "count": 1302,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    ...
  ]
}
```

### 2. Get Pokémon Details
```
GET /api/pokemon/{name}
```
Returns detailed information about a specific Pokémon.

**Example:** `GET /api/pokemon/pikachu`

**Response:**
```json
{
  "name": "pikachu",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  "types": ["electric"],
  "height": 4,
  "weight": 60,
  "abilities": ["static", "lightning-rod"]
}
```

**Note:** 
- Height is returned in decimeters (divide by 10 to get meters)
- Weight is returned in hectograms (divide by 10 to get kilograms)

## Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   uvicorn app:app --reload
   ```

   The API will be available at `http://localhost:8000`

5. **Access the interactive API documentation:**
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## Testing

You can test the endpoints using curl:

```bash
# Get Pokémon list
curl http://localhost:8000/api/pokemon

# Get Pokémon details
curl http://localhost:8000/api/pokemon/pikachu
```

## External API

This application uses the [PokéAPI](https://pokeapi.co/) which is free and requires no authentication.

## Dependencies

- FastAPI - Modern web framework for building APIs
- Uvicorn - ASGI server
- httpx - Async HTTP client

