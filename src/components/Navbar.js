import React, {useContext} from "react";
import FavoritesContext from "../contexts/favoritesContext";

const Navbar = () => {
    const { favoritePokemon } = useContext(FavoritesContext);
        const LogoImg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    return(
            <nav>
                <div>
                    <img
                    alt="pokeapi-logo"
                    src={LogoImg}
                    className="navbar-img"
                    />
                </div>
                <div>{favoritePokemon.length}❤️</div>
            </nav>
    )
}

export default Navbar;