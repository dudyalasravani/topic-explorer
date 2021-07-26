import React, { useState } from "react";

const SearchBar = props => {
  const [searchTerm, setSearchTerm] = useState(props.initSearch);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-brand">Github GraphQL Demo {props.init}</div>
      <div className="form-inline">
        <input
          value={searchTerm}
          onChange={handleChange}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={() => props.onSearchChange(searchTerm)}
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default SearchBar;
