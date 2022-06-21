import React, {useEffect, useState} from "react";
import { getPokemonData, getPokemons } from "./api";
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from "./components/Pokedex";
import SearchBar from './components/SearchBar';
import { FavoritesProvider } from "./contexts/favoritesContext";


function App() {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const itensPerpage = 36
  const fetchPokemons = async () => {
    try{
    setLoading(true);
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

  useEffect(() => {
    fetchPokemons();
  }, [page]);

const updateFavoritePokemons = (name) => {
  const updatedFavorites = [...favorites]
  const favoriteIndex = favorites.indexOf(name)
  if(favoriteIndex >= 0) {
    updatedFavorites.slice(favoriteIndex, 1);
  } else {
    updatedFavorites.push(name);
  }
  setFavorites(updatedFavorites);
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
      <SearchBar/>
      <Pokedex 
        pokemons={pokemons} 
        loading={loading} 
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
    </FavoritesProvider>
  );
}

export default App;
