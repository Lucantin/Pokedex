import React, {useEffect, useState} from "react";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from "./components/Pokedex";
import SearchBar from './components/SearchBar';
import { FavoritesProvider } from "./contexts/favoritesContext";

const favoritesKey = "f"

function App() {

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const itensPerpage = 36
  const fetchPokemons = async () => {
    try{
    setLoading(true);
    setNotFound(false);
    const data = await getPokemons(itensPerpage, itensPerpage * page);
    const promises = data.results.map(async (pokemon) => {
      return await getPokemonData(pokemon.url)
    });

    const results = await Promise.all(promises);
    setPokemons(results);
    setLoading(false);
    setTotalPages(Math.ceil(data.count / itensPerpage));
    } catch (error) {
      console.log("fetchPokemons error: " ,error);
    }
  }


  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

const updateFavoritePokemons = (name) => {
  const updatedFavorites = [...favorites]
  const favoriteIndex = favorites.indexOf(name)
  if(favoriteIndex >= 0) {
    updatedFavorites.splice(favoriteIndex, 1);
  } else {
    updatedFavorites.push(name);
  }
  window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
  setFavorites(updatedFavorites);
}

  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon)
    if(!result){
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
      setLoading(false)
  }
  return (
    <FavoritesProvider
    value={{
      favoritePokemon: favorites, 
      updateFavoritePokemons: updateFavoritePokemons,
    }} 
    >
    <div>
      <Navbar />
      <SearchBar onSearch={onSearchHandler}/>
      {notFound ? (
        <div className="not-found-text"><h4>Pokémon não encontrado</h4></div>
      ) : (
      <Pokedex 
        pokemons={pokemons} 
        loading={loading} 
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />)}
    </div>
    </FavoritesProvider>
  );
}

export default App;
