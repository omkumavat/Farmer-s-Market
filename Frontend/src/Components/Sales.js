import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";
import "../DashboardCSS/sales.css";
import { useAuth } from "../Context/AuthContext";

const Sales = () => {
  const { currentUser } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState(null);

  const [options, setOptions] = useState({
    data: [],
    title: {
      text: "Top-Selling Products",
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "productName",
        angleKey: "totalRevenue",
        innerRadiusRatio: 0.7,
      },
    ],
  });

  useEffect(() => {
    const fetchProductSales = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(
            `http://localhost:4000/server/sales/get-sale/${currentUser.sellerId}`
          );
          const data = response.data.data;
          console.log(data)
          setSalesData(data);
          setOptions((prevOptions) => ({
            ...prevOptions,
            data,
          }));
        }
      } catch (err) {
        console.error("Error fetching product sales data:", err);
        setError(err.message);
      }
    };

    fetchProductSales();
  }, [currentUser,setSalesData]);

  return (
    <div className="chart-container">
      <AgCharts options={options} />
      <div className="product-list pl" >
        {salesData.map((product, index) => (
          <div key={index} className="product-item">
            <span className="product-name">{product.productName}</span>
            <span className="product-revenue">
              ₹{product.totalRevenue.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
