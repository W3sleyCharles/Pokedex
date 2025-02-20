const pokemonList = document.querySelector(".pokemon-list");
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let startIndex = 1; 
let isRendering = false; 


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    return null;
};

const renderPokemon = async (start) => {
    if (isRendering) return;
    isRendering = true; 

    pokemonList.innerHTML = ''; 

    for (let i = start; i < start + 9; i++) {
        const data = await fetchPokemon(i);
        if (data) {
            const listItem = document.createElement("li");

            const pokemonImg = document.createElement("img");
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokemonImg.alt = data.name;
            pokemonImg.classList.add("pokemon_image_alt");

            listItem.appendChild(pokemonImg);
            pokemonList.appendChild(listItem);
        }
    }

    isRendering = false;
};


buttonPrev.addEventListener('click', () => {
    if (startIndex > 1) {
        startIndex -= 9;
        renderPokemon(startIndex);
    }
});

buttonNext.addEventListener('click', () => {
    if (startIndex + 9 <= 648) {
        startIndex += 9;
        renderPokemon(startIndex);
    }
});

renderPokemon(startIndex);