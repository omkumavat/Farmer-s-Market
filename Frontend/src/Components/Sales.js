import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";
import "../DashboardCSS/sales.css";
import { useAuth } from "../Context/AuthContext";

const Sales = () => {
  const { currentUser } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState(null);

<<<<<<< HEAD
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
=======
    useEffect(() => {
        const fetchProductSales = async () => {
            try {
                if (currentUser) {
                    const response = await axios.get(
                        `https://farmer-s-market-theta.vercel.app/server/sales/get-sale-farmer/${currentUser.sellerId}`
                    );
                    const transformedData = response.data.data.map(item => ({
                        productName: item.productName,
                        totalRevenue: item.totalRevenue,
                    }));
                    // // console.log(transformedData)
                    setSalesData(transformedData);
                }
            } catch (err) {
                console.error("Error fetching product sales data:", err);
                setError(err.message);
            }
        };
>>>>>>> 38e407aa3131a9eb87a7c78fee78262c6e6a79a0

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

<<<<<<< HEAD
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
=======
    if (!salesData.length) {
        return <div>No sales data available</div>;
    }

    return (
        <div className="chart-container">
            <AgCharts options={options} />
        </div>
        
    );
>>>>>>> 38e407aa3131a9eb87a7c78fee78262c6e6a79a0
};

export default Sales;
