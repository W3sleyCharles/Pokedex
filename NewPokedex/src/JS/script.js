const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');



let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
}}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonName.innerHTML = data.name;

    pokemonNumber.innerHTML = data.id;

    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id;
    input.value = '';

} else {
    pokemonName.innerHTML = 'Não achamos :(';
    pokemonNumber.innerHTML = 'F';
    pokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/201.gif';
} 

}

form.addEventListener('submit', (event) => {    
    event.preventDefault();

    console.log('input.value')

    renderPokemon(input.value.toLowerCase());
    
});

buttonPrev.addEventListener('click', () => {    
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {    
    if (searchPokemon <= 648)
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);

