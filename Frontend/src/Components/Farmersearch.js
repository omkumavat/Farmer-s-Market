import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {SearchBar1} from "./SearchBar";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FarmerProduct from "./FarmerProduct";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles


const Farmersearch = () => {
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
        `http://localhost:4000/server/farmersearch/?q=${encodeURIComponent(
          query
        )}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ToastContainer />
    <div>
        <NavBar/>
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <SearchBar1 initialSearchTerm={query || ""} />
      <h1>Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="product-section">
        <div className="product-grid">
            {products.map((product, index) => (
                <div key={index} className="product-card">
                    <FarmerProduct {...product} />
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
    </>
  );
};

export default Farmersearch;
