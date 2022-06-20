import React, {useState} from "react";
import {searchPokemon} from "../api";

const SearchBar = ( ) => {
    const [search, setSearch] = useState("ditto");
    const [pokemon, setPokemon] = useState();
    const onChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onButtonClickHandler = () => {
        onSearchHandler(search);
    }

    const onSearchHandler = async (pokemon) => {
        const result = await searchPokemon(pokemon);
        setPokemon(result);
        
      }

    return(
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar Pokémon" onChange={onChangeHandler} />
            </div>
            <div className="search-btn">
                <button onClick={onButtonClickHandler}>Buscar</button>
            </div>
        
        {pokemon ? (
            <div>
                <div>Id: {pokemon.id}</div>
                <div>Nome: {pokemon.name}</div>
                <div>Peso: {pokemon.weight}</div>
                <div>Altura: {pokemon.height}</div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            </div>
        ) : null}
        </div>
    )
}


export default SearchBar;