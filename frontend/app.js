const API_BASE_URL = 'http://localhost:8000/api';

// DOM elements
const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const pokemonGrid = document.getElementById('pokemon-grid');
const pokemonDetail = document.getElementById('pokemon-detail');
const backButton = document.getElementById('back-button');
const loading = document.getElementById('loading');

// Show list view
function showListView() {
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');
}

// Show detail view
function showDetailView() {
    listView.classList.add('hidden');
    detailView.classList.remove('hidden');
}

// Fetch Pokémon list
async function fetchPokemonList() {
    try {
        loading.style.display = 'block';
        pokemonGrid.innerHTML = '';
        
        const response = await fetch(`${API_BASE_URL}/pokemon`);
        const data = await response.json();
        
        loading.style.display = 'none';
        
        // Fetch details for each Pokémon to get images
        const pokemonPromises = data.results.map(pokemon => 
            fetchPokemonDetail(pokemon.name)
        );
        
        const pokemonDetails = await Promise.all(pokemonPromises);
        
        pokemonDetails.forEach(pokemon => {
            if (pokemon) {
                createPokemonCard(pokemon);
            }
        });
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
        loading.textContent = 'Error loading Pokémon. Please try again.';
    }
}

// Fetch Pokémon detail
async function fetchPokemonDetail(name) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching Pokémon ${name}:`, error);
        return null;
    }
}

// Create Pokémon card
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.onclick = () => showPokemonDetail(pokemon.name);
    
    card.innerHTML = `
        <img src="${pokemon.image || 'https://via.placeholder.com/120'}" 
             alt="${pokemon.name}" 
             onerror="this.src='https://via.placeholder.com/120'">
        <h3>${pokemon.name}</h3>
    `;
    
    pokemonGrid.appendChild(card);
}

// Show Pokémon detail
async function showPokemonDetail(name) {
    try {
        pokemonDetail.innerHTML = '<div class="loading">Loading...</div>';
        showDetailView();
        
        const pokemon = await fetchPokemonDetail(name);
        
        if (!pokemon) {
            pokemonDetail.innerHTML = '<div class="loading">Pokémon not found</div>';
            return;
        }
        
        renderPokemonDetail(pokemon);
    } catch (error) {
        console.error('Error showing Pokémon detail:', error);
        pokemonDetail.innerHTML = '<div class="loading">Error loading Pokémon details</div>';
    }
}

// Render Pokémon detail
function renderPokemonDetail(pokemon) {
    const typesHTML = pokemon.types.map(type => 
        `<span class="type-badge">${type}</span>`
    ).join('');
    
    const abilitiesHTML = pokemon.abilities.map(ability => 
        `<span class="ability-badge">${ability}</span>`
    ).join('');
    
    // Convert height from decimeters to meters
    const heightInMeters = (pokemon.height / 10).toFixed(1);
    
    // Convert weight from hectograms to kilograms
    const weightInKg = (pokemon.weight / 10).toFixed(1);
    
    pokemonDetail.innerHTML = `
        <div class="pokemon-detail-header">
            <img src="${pokemon.image || 'https://via.placeholder.com/200'}" 
                 alt="${pokemon.name}"
                 onerror="this.src='https://via.placeholder.com/200'">
            <h2>${pokemon.name}</h2>
        </div>
        <div class="pokemon-detail-info">
            <div class="detail-section">
                <h3>Type</h3>
                <div class="types">${typesHTML}</div>
            </div>
            <div class="detail-section">
                <h3>Height</h3>
                <p>${heightInMeters} m</p>
            </div>
            <div class="detail-section">
                <h3>Weight</h3>
                <p>${weightInKg} kg</p>
            </div>
            <div class="detail-section">
                <h3>Abilities</h3>
                <div class="abilities">${abilitiesHTML}</div>
            </div>
        </div>
    `;
}

// Back button handler
backButton.addEventListener('click', showListView);

// Initialize app
fetchPokemonList();

