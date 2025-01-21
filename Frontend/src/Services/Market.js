
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ServicesCSS/Market.css";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Spinner from "../Components/Spinner";

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
  const [isAuthReady,setisAuthReady]=useState(false);

  useEffect(() => {
    setisAuthReady(true);
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
      setisAuthReady(false);
  }, []);

  const handleFilterChange = (e) => {
    setisAuthReady(true);
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
    setisAuthReady(false);
  };

  const handleSearch = () => {
    setisAuthReady(true);
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
    setisAuthReady(false);
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
        icon: "📊", // Replace with your SVG or image
        title: "Market Trends",
        description: "Market Trends provide insights into current patterns and shifts in consumer behavior, helping businesses adapt and stay competitive. Stay informed to seize emerging opportunities.",
    },
    {
        icon: "📈", // Replace with your SVG or image
        title: "Sales Performance",
        description: "Sales Performance tracks the efficiency and success of sales activities, offering insights to optimize strategies and achieve revenue goals.",
    },
    {
        icon: "🌍", // Replace with your SVG or image
        title: "Regional Insights",
        description: "Regional Insights analyze local market conditions, consumer preferences, and economic factors to help businesses tailor their strategies for specific areas.",
    },
    {
        icon: "🛠️", // Replace with your SVG or image
        title: "Competitive Analysis",
        description: "Farmers provide land preparation services such as tilling, plowing, and soil fertilization for crop planting.",
    },
    {
        icon: "📢", // Replace with your SVG or image
        title: "Consumer Preferences",
        description: "Competitive Analysis evaluates the strengths and weaknesses of current and potential competitors, providing valuable insights to refine strategies and maintain a competitive edge.",
    },
    {
        icon: "💡", // Replace with your SVG or image
        title: "Custom Reports",
        description: "Custom Reports allow businesses to generate tailored data insights based on specific metrics and needs, enabling informed decision-making.",
    },
];

  return (
    <><NavBar />
    <div className="mc">
          <div className="cs">
            <h2 className="head1">Market Insight</h2>
            <p className="head2">PROVIDE BY AgriHaven</p>
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
      <div className="mar">
      <h3>Filtered Market Data</h3>
      </div>
        <section className="data-display">
          {hasSearched && filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div className="data-item" key={index}>
                <p><strong>Commodity :</strong> {item.commodity}</p>
                <p><strong>Market :</strong> {item.market}</p>
                <p><strong>State :</strong> {item.state}</p>
                <p><strong>District :</strong> {item.district}</p>
                <p><strong>Max Price : </strong>₹ {item.max_price}</p>
                <p><strong>Min Price : </strong>₹ {item.min_price}</p>
                <p><strong>Arrival Date :</strong> {item.arrival_date}</p>
              </div>
            ))
          ) : isAuthReady ? (
            <Spinner />
          ) : (
            <p>No data to display</p>
          )}
      </section>
    </div>

    <div className="services-container">
                    <div className="serv">
                        <h2 className="services-title">Market Analysis</h2>
                        <p className="services-subtitle">
                        AgriHaven empowers businesses and individuals with data-driven insights, ensuring informed decisions through comprehensive market analysis.
                        </p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div className="service-card" key={index}>
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container-market">
                    {/* Top Section */}
                    <div className="content-market">
                        <p className="sub-heading-market">AT AgriHaven</p>
                        <h1 className="main-heading-market">
                          For a Data-Driven Market Future<br /> <span>Tomorrow</span>
                        </h1>
                        <div className="descc-market">
                        <p className="description-market">
                        AgriHaven offers a platform for businesses to access detailed market insights, helping them stay ahead of trends, track sales performance, and analyze regional dynamics. This enables companies to make data-driven decisions and refine their strategies.
                        </p>
                        <p className="description-market">
                        Businesses can generate custom reports, perform competitive analysis, and gain a comprehensive understanding of market conditions. AgriHaven makes it easier for organizations to connect with the right opportunities and optimize their operations for success.
                        </p>
                        <p className="description-market">AgriHaven is dedicated to fostering a trusted environment where businesses can thrive by leveraging data. We aim to build a forward-thinking marketplace that promotes growth and success for all stakeholders.</p>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="image-container-market">
                        <img
                            src="/Images/marketinsight.jpeg" // Placeholder image URL
                            alt="Sustainable Agriculture"
                            className="farming-image-market"
                        />
                    </div>
                </div>
          <Footer />
          </>
  );
};

export default App;
