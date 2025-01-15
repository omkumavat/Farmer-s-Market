import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ initialSearchTerm = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term!");
      return;
    }
    navigate(`/search-results?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title, name, category, or description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
