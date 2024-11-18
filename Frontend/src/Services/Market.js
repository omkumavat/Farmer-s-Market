
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../ServicesCSS/Market.css";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const Market = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    commodity: '',
  });
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000017704f08e67e4414747189afb9ef2d662&format=json&offset=0&limit=4000')
      .then(response => {
        setData(response.data.records);
        setFilteredData(response.data.records);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevState => {
      const newFilters = { ...prevState, [name]: value };
      filterData(newFilters);
      return newFilters;
    });
  };

  const filterData = (filters) => {
    setFilteredData(
      data.filter(item => {
        return (
          (filters.state ? item.state.toLowerCase().includes(filters.state.toLowerCase()) : true) &&
          (filters.district ? item.district.toLowerCase().includes(filters.district.toLowerCase()) : true) &&
          (filters.commodity ? item.commodity.toLowerCase().includes(filters.commodity.toLowerCase()) : true)
        );
      })
    );
  };

  const handleRowClick = (item) => {
    setSelectedRow(item);
  };

  return (
    <>
      <NavBar />
    <div>
        <div className="market-page">
      <h1>Market Insight</h1>
      <div>
        <label>State: </label>
        <input type="text" name="state" value={filters.state} onChange={handleFilterChange} />
        <label>District: </label>
        <input type="text" name="district" value={filters.district} onChange={handleFilterChange} />
        <label>Commodity: </label>
        <input type="text" name="commodity" value={filters.commodity} onChange={handleFilterChange} />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>District</th>
            <th>Market</th>
            <th>Commodity</th>
            <th>Variety</th>
            <th>Price (Min/Max/Modal)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
              <td>{item.state}</td>
              <td>{item.district}</td>
              <td>{item.market}</td>
              <td>{item.commodity}</td>
              <td>{item.variety}</td>
              <td>{item.min_price} / {item.max_price} / {item.modal_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow && (
        <div className="card">
          <h3>Market Details</h3>
          <p><strong>State:</strong> {selectedRow.state}</p>
          <p><strong>District:</strong> {selectedRow.district}</p>
          <p><strong>Market:</strong> {selectedRow.market}</p>
          <p><strong>Commodity:</strong> {selectedRow.commodity}</p>
          <p><strong>Variety:</strong> {selectedRow.variety}</p>
          <p><strong>Price (Min):</strong> {selectedRow.min_price}</p>
          <p><strong>Price (Max):</strong> {selectedRow.max_price}</p>
          <p><strong>Price (Modal):</strong> {selectedRow.modal_price}</p>
        </div>
      )}
    </div>
    </div>
    <Footer />
    </>
  );
};

export default Market;
