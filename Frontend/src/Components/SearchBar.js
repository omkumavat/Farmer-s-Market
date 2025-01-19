import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles


export const SearchBar = ({ initialSearchTerm = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    navigate(`/dealersearch?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title, name, category, or description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
          fontSize: "16px",
          marginTop:"120px",
          marginLeft:"500px",
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
          width:100
        }}
      >
        Search
      </button>
    </div>
  );
};


export const SearchBar1 = ({ initialSearchTerm = "" }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const navigate = useNavigate();
  
    const handleSearch = () => {
      if (!searchTerm.trim()) {
        toast.error("Please enter a search term!");
        return;
      }
      navigate(`/farmersearch?q=${encodeURIComponent(searchTerm)}`);
    };
  
    return (
      <><ToastContainer />
      <div>
        <input
          type="text"
          placeholder="Search by title, name, category, or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "400px",
            padding: "10px",
            fontSize: "16px",
            marginTop:"120px",
            marginLeft:"500px",
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
            width:100
          }}
        >
          Search
        </button>
      </div>
      </>
    );
  };

