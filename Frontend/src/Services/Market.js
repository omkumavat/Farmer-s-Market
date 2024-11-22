
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

  return (
    <><NavBar />
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
          <Footer />
          </>
  );
};

export default App;
