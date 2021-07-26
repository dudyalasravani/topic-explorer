import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/searchbar";
import DisplayContent from "./components/display";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("react");

  const handleSearchChange = key => {
    setSearchTerm(key);
  };

  return (
    <div>
      <SearchBar
        initSearch={searchTerm}
        onSearchChange={handleSearchChange}
      ></SearchBar>
      <div className="jumbotron">
        <DisplayContent search={searchTerm}></DisplayContent>
        <hr className="my-4"></hr>
      </div>
    </div>
  );
};

export default App;
