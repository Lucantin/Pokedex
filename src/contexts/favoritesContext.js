import React from "react";

const FavoritesContext = React.createContext({
    favoritePokemon: [],
    updateFavoritePokemons: (id) => null
});

export const FavoritesProvider = FavoritesContext.Provider;

export default FavoritesContext; 