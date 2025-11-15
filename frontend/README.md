# Pokémon Frontend

A clean, simple frontend UI for browsing Pokémon data. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **List View**: Browse a grid of the first 20 Pokémon with images
- **Detail View**: View detailed information about a specific Pokémon including:
  - Name
  - Image (official artwork or default sprite)
  - Type(s)
  - Height (in meters)
  - Weight (in kilograms)
  - Abilities
- **Clean UI**: Simple, responsive design with smooth navigation

## User Flow

1. User opens the app → sees a grid of 20 Pokémon with images
2. Clicks on any Pokémon → sees detailed information
3. Clicks "Back" → returns to the list

## Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Make sure the backend API is running:**
   - The backend should be running at `http://localhost:8000`
   - See the [backend README](../backend/README.md) for setup instructions

3. **Open the frontend:**
   - Option 1: Simply open `index.html` in your web browser
   - Option 2: Use a simple HTTP server:
     ```bash
     # Python 3
     python3 -m http.server 8080
     
     # Then open http://localhost:8080 in your browser
     ```

## Configuration

The frontend is configured to connect to the backend API at `http://localhost:8000` by default. You can modify the `API_BASE_URL` constant in `app.js` if your backend is running on a different host or port.

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `app.js` - JavaScript logic for API calls and UI interactions

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript (async/await, fetch API)
- CSS Grid
- Flexbox

