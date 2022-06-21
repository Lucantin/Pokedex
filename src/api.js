export const searchPokemon = async (pokemon) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        console.log(error);
    }
}

export const getPokemons = async (Limit = 50, offset = 0) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/?limit=${Limit}&offset=${offset}`;
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        console.log(error);
    }
}

export const getPokemonData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        console.log(error);
    }
}