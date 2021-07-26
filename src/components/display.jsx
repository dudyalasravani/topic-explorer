import React, { useState } from "react";
import SearchResult from "./searchResult";

const DisplayContent = props => {
  const [searchTerm, setSearchTerm] = useState(props.search);

  const handleChange = value => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  };

  return (
    <div>
      <h3 className="display-4" title="topic of search term">
        TOPIC: <span className="badge badge-secondary">{searchTerm}</span>
      </h3>
      <SearchResult
        key={props.search}
        value={props.search}
        onChange={handleChange}
      ></SearchResult>
    </div>
  );
};

export default DisplayContent;
