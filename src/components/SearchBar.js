import React, {useState} from "react";

const SearchBar = ( props ) => {
    const [search, setSearch] = useState("dito");
    const { onSearch } = props
    const onChangeHandler = (e) => {
        setSearch(e.target.value);
        if(e.target.value.length === 0) {
            onSearch(undefined);
        }
    }

    const onButtonClickHandler = () => {
        onSearch(search);
    }

    return(
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar Pokémon" onChange={onChangeHandler} />
            </div>
            <div className="search-btn">
                <button onClick={onButtonClickHandler}>Buscar</button>
            </div>
        </div>
    )
}


export default SearchBar;