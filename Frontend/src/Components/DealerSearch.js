import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {SearchBar} from "./SearchBar";
import DealerPCard from "./DealerPCard";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import Spinner from "./Spinner";
import Loader from "./Loader";

const DealerSearch = () => {
  const [products, setProducts] = useState([]);
  const [isAuthReady,setisauthReady]=useState(true);
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
      setisauthReady(true);
      setLoading(true);
      // Adjust API call to include the backend server's port
      const response = await axios.get(
        `https://farmer-dealer-user.vercel.app/api/products/search?q=${encodeURIComponent(
          query
        )}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products.");
    } finally {
      setLoading(false);
      setisauthReady(false);
    }
  };

  return (
       <>
        <ToastContainer />
    <div>
        <NavBar/>
        <div style={{ marginBottom:"130px", padding: "20px", fontFamily: "Arial" }}>
        <div style={{ marginBottom:"-210px",padding: "20px", fontFamily: "Arial" }}>
        <SearchBar initialSearchTerm={query || ""} />
        <h1>Search Results for "{query}"</h1>
        </div>
      {loading ? (
        <Loader/>
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
    { !isAuthReady ? ( <Footer/> ) : (<Loader/>) }
    </div>
    </>
  );
};

export default DealerSearch;
