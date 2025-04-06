// Part I

async function getPokemon(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        return (data)
    } catch(err) {
        console.log(err)
    }
};

function showPokemon(pokemon) {
    const container = document.querySelector('#pokeDisplay')
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card-info'

    pokeCard.innerHTML = `
        <h5>${pokemon.name}</h5>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>${pokemon.abilities.map(ability => ability.ability.name)}</p>
    `;
    container.appendChild(pokeCard)
}

async function getAndShowPokemon(pokemonName) {
    const pokemon = await getPokemon(pokemonName)
    if (pokemon) {
        showPokemon(pokemon)
    }else {
        console.error("No Pokemon to display")
    }
}
getAndShowPokemon('mewtwo')

// Part II

const secondsInput = document.getElementById('secondsInput');
const startBtn = document.getElementById('startBtn');
const timer = document.getElementById('timer');

let countdown;

setTimeout(function() {
    console.log("Starting...");
}, 3000);

startBtn.addEventListener('click', () => {
    const seconds = +secondsInput.value;
    if (secondsInput.value <= 0 || isNaN(seconds)) {
        return alert("Enter a valid number of seconds")
    }
    
    clearInterval(countdown);
    
    let time = seconds;
    
    countdown = setInterval(() => {
        const mins = String(Math.floor(time / 60)).padStart(2, "0");
        const secs = String(time % 60).padStart(2, '0');
    
        timer.textContent = `${mins}:${secs}`;
        console.log("Time Left:", time)
        time--;
    
        if (time < 0) {
            clearInterval(countdown)
            timer.textContent = "Time's Up!";
        }
    }, 1000);
});
