import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {SearchBar} from "./SearchBar";
import DealerPCard from "./DealerPCard";
import NavBar from "./NavBar";
import Footer from "./Footer";

const DealerSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Extract query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Adjust API call to include the backend server's port
      const response = await axios.get(
        `https://farmer-s-market-theta.vercel.app/api/products/search?q=${encodeURIComponent(
          query
        )}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <NavBar/>
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <SearchBar initialSearchTerm={query || ""} />
      <h1>Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="product-section">
        <div className="product-grid">
            {products.map((product, index) => (
                <div key={index} className="product-card">
                    <DealerPCard {...product} />
                </div>
            ))}
        </div>
    </div>
      ) : (
        <p>No products found matching "{query}".</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default DealerSearch;
