
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ServicesCSS/Market.css";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    commodity: "",
    state: "",
    district: "",
    market: "",
    dateFrom: "",
  });
  const [states, setStates] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000017704f08e67e4414747189afb9ef2d662&format=json&offset=0&limit=4000"
      )
      .then((response) => {
        const records = response.data.records;
        setData(records);
        setFilteredData(records);
        setStates([...new Set(records.map((item) => item.state))]);
        setDistricts(records);
        setCommodities([...new Set(records.map((item) => item.commodity))]);
        setMarkets(records);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

    if (name === "state") {
      const filtered = districts
        .filter((item) => item.state === value)
        .map((item) => item.district);
      setFilteredDistricts([...new Set(filtered)]);
      setFilteredMarkets([]);
      setFilters((prevFilters) => ({
        ...prevFilters,
        district: "",
        market: "",
      }));
    }

    if (name === "district") {
      const filtered = markets
        .filter((item) => item.district === value)
        .map((item) => item.market);
      setFilteredMarkets([...new Set(filtered)]);
      setFilters((prevFilters) => ({ ...prevFilters, market: "" }));
    }
  };

  const handleSearch = () => {
    const { commodity, state, district, market, dateFrom } = filters;
    const filtered = data.filter((item) => {
      let isValid = true;
      if (commodity && item.commodity !== commodity) isValid = false;
      if (state && item.state !== state) isValid = false;
      if (district && item.district !== district) isValid = false;
      if (market && item.market !== market) isValid = false;
      if (dateFrom && new Date(item.arrival_date) < new Date(dateFrom))
        isValid = false;
      return isValid;
    });

    setFilteredData(filtered);
    setHasSearched(true);
  };
  const categories = [
    { name: "Offers", img: "/Images/dealer11.jpg", url: "/farmer/category/offers" },
    { name: "Fresh Produce", img: "/Images/farmer1.jpg", url: "/farmer/category/vegetable-crops" },
    { name: "Grains and Cereals", img: "/Images/farmer2.jpg", url: "/farmer/category/fruits" },
    { name: "Pulses and Legumes", img: "/Images/farmer3.jpg", url: "/farmer/category/dairy-products" },
    { name: "Dairy and Milk Products", img: "/Images/farmer4.jpg", url: "/farmer/category/poultry" },
    { name: "Livestock and Animal Products", img: "/Images/farmer5.jpg", url: "/farmer/category/honey" },
    { name: "Organic Products", img: "/Images/farmer6.jpg", url: "/farmer/category/organic-farming" },
    { name: "Value-Added Products", img: "/Images/farmer7.jpg", url: "/farmer/category/animal-husbandry" },
    { name: "Specialty Crops", img: "/Images/farmer8.jpg", url: "/farmer/category/grains" },
    { name: "Fibers and Raw Materials", img: "/Images/farmer9.jpg", url: "/farmer/category/herbs" },
    { name: "Flowers & Plants", img: "/Images/farmer10.jpg", url: "/farmer/category/flowers-plants" },
    { name: "By-products", img: "/Images/farmer11.jpg", url: "/farmer/category/vegetable-seeds" },
];


const brandLogos = [
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg"
];



const services = [
    {
        icon: "🌾", // Replace with your SVG or image
        title: "Crop Production",
        description: "Farmers provide high-quality crops, from grains to vegetables, grown with care and expertise.",
    },
    {
        icon: "🐄", // Replace with your SVG or image
        title: "Animal Husbandry",
        description: "Farmers raise livestock for meat, milk, and other by-products, ensuring quality and sustainability.",
    },
    {
        icon: "🌱", // Replace with your SVG or image
        title: "Organic Farming",
        description: "Farmers offer organic produce, grown without harmful chemicals, ensuring a healthier option for consumers.",
    },
    {
        icon: "🚜", // Replace with your SVG or image
        title: "Land Preparation",
        description: "Farmers provide land preparation services such as tilling, plowing, and soil fertilization for crop planting.",
    },
    {
        icon: "🌻", // Replace with your SVG or image
        title: "Flower Farming",
        description: "Farmers grow flowers for sale to nurseries, markets, or for decoration in events and homes.",
    },
    {
        icon: "🍯", // Replace with your SVG or image
        title: "Honey Production",
        description: "Farmers harvest honey from beehives, offering fresh, natural honey directly from the farm.",
    },
];

  return (
    <><NavBar />
    <div className="mc">
          <div className="cs">
            <h2 className="head1">Market Services</h2>
            <p className="head2">PROVIDE BY VERDICA</p>
          </div>
          </div>
    <div className="container">
      {/* Header */}
      
         <div className="fil">

      {/* Filter Section */}
      <div className="filter-bar">
        <div>
          <label>Commodity</label>
          <select
            name="commodity"
            onChange={handleFilterChange}
            value={filters.commodity}
          >
            <option value="">--Select Commodity--</option>
            {commodities.map((commodity, index) => (
              <option key={index} value={commodity}>
                {commodity}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>State</label>
          <select name="state" onChange={handleFilterChange} value={filters.state}>
            <option value="">--Select State--</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>District</label>
          <select
            name="district"
            onChange={handleFilterChange}
            value={filters.district}
            disabled={!filters.state}
          >
            <option value="">--Select District--</option>
            {filteredDistricts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Market</label>
          <select
            name="market"
            onChange={handleFilterChange}
            value={filters.market}
            disabled={!filters.district}
          >
            <option value="">--Select Market--</option>
            {filteredMarkets.map((market, index) => (
              <option key={index} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date From</label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />
        </div>

        <button onClick={handleSearch}>Go</button>
      </div>
      </div>
      {/* Data Display */}
      <section className="data-display">
        <h3>Filtered Market Data</h3>
        {hasSearched && filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div className="data-item" key={index}>
              <p><strong>Commodity:</strong> {item.commodity}</p>
              <p><strong>Market:</strong> {item.market}</p>
              <p><strong>State:</strong> {item.state}</p>
              <p><strong>District:</strong> {item.district}</p>
              <p><strong>Max Price:</strong> {item.max_price}</p>
              <p><strong>Min Price:</strong> {item.min_price}</p>
              <p><strong>Arrival Date:</strong> {item.arrival_date}</p>
            </div>
          ))
        ) : (
          <p>No data available for the selected filters.</p>
        )}
      </section>
    </div>

    <div className="services-container">
                    <div className="serv">
                        <h2 className="services-title">Farm Produce</h2>
                        <p className="services-subtitle">
                        Verdica empowers farmers to connect and sell their produce directly, ensuring fair prices through a global community-driven platform.
                        </p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div className="service-card" key={index}>
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <a href="#" className="service-link">
                                    Learn More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container">
                    {/* Top Section */}
                    <div className="content">
                        <p className="sub-heading">AT VERDICA</p>
                        <h1 className="main-heading">
                            For a Thriving Agricultural Community<br /> <span>Tomorrow</span>
                        </h1>
                        <p className="description">
                        Verdica provides a platform where farmers can offer essential services like land preparation, crop cultivation, and organic farming to others in the agricultural community. This enables farmers to showcase their skills and expertise.
                        </p>
                        <p className="description">
                        Farmers can list, manage, and sell their services, helping them reach a broader audience. Verdica makes it easier for farmers to connect with those who need their services, ensuring mutual growth.
                        </p>
                        <p className="description">Verdica is dedicated to creating a trusted environment where farmers can succeed by offering their valuable services. We aim to build a vibrant community that drives success and mutual benefit.</p>
                    </div>

                    {/* Image Section */}
                    <div className="image-container">
                        <img
                            src="/Images/slider1.jpeg" // Placeholder image URL
                            alt="Sustainable Agriculture"
                            className="farming-image"
                        />
                    </div>
                </div>
                <div className="categories-container">
                    <h2 className="categories-heading">Categories</h2>
                    <div className="styleline"></div>
                    <div className="categories-grid">
                        {categories.map((category, index) => (

                            <div key={index} className="category-item">
                                <a href={category.url}>
                                    <div className="category-image">
                                        <img src={category.img} alt={category.name} />
                                    </div>
                                </a>
                                <p className="category-name">{category.name}</p>
                            </div>

                        ))}
                    </div>
                </div>
                <div className="brandc">
                    <div className="brands">
                        <div className="sliderb">
                            {brandLogos.map((logo, index) => (
                                <div className="imgg" key={index}>
                                    <img src={logo} alt={`Brand ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
          <Footer />
          </>
  );
};

export default App;
