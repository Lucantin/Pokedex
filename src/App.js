import React from "react";
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from "./components/Pokedex";
import SearchBar from './components/SearchBar';

function App() {

  return (
    <div>
      <Navbar />
      <SearchBar/>
      <Pokedex />
    </div>
  );
}

export default App;
