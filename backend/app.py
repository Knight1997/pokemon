from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from typing import List, Dict, Any

app = FastAPI(title="Pokémon API", description="A simple backend API for Pokémon data")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

POKEAPI_BASE_URL = "https://pokeapi.co/api/v2"


@app.get("/api/pokemon")
async def get_pokemon_list():
    """
    Get a list of the first 20 Pokémon
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{POKEAPI_BASE_URL}/pokemon?limit=20")
            response.raise_for_status()
            data = response.json()
            
            # Extract simplified Pokémon data
            pokemon_list = []
            for pokemon in data.get("results", []):
                pokemon_list.append({
                    "name": pokemon.get("name"),
                    "url": pokemon.get("url")
                })
            
            return {
                "count": data.get("count", 0),
                "results": pokemon_list
            }
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch Pokémon list")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.get("/api/pokemon/{name}")
async def get_pokemon_detail(name: str):
    """
    Get detailed information about a specific Pokémon by name
    Returns: name, image, type(s), height, weight, and abilities
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{POKEAPI_BASE_URL}/pokemon/{name.lower()}")
            response.raise_for_status()
            data = response.json()
            
            # Extract types
            types = [type_info["type"]["name"] for type_info in data.get("types", [])]
            
            # Extract abilities
            abilities = [ability_info["ability"]["name"] for ability_info in data.get("abilities", [])]
            
            # Get image URL (official artwork or front default)
            image_url = None
            sprites = data.get("sprites", {})
            if sprites.get("other", {}).get("official-artwork", {}).get("front_default"):
                image_url = sprites["other"]["official-artwork"]["front_default"]
            elif sprites.get("front_default"):
                image_url = sprites["front_default"]
            
            return {
                "name": data.get("name"),
                "image": image_url,
                "types": types,
                "height": data.get("height"),  # Height in decimeters (divide by 10 for meters)
                "weight": data.get("weight"),  # Weight in hectograms (divide by 10 for kg)
                "abilities": abilities
            }
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail=f"Pokémon '{name}' not found")
        raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch Pokémon details")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.get("/")
async def root():
    """
    Root endpoint with API information
    """
    return {
        "message": "Pokémon API",
        "endpoints": {
            "list": "/api/pokemon",
            "detail": "/api/pokemon/{name}"
        }
    }

