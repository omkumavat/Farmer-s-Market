import React, { useState, useEffect } from "react";
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
            text: "All Product Sales",
        },
        series: [
            {
                type: "donut",
                calloutLabelKey: "productName",
                angleKey: "totalRevenue",
                innerRadiusRatio: 0.7,
                label: {
                  formatter: ({ datum }) => `₹${datum.totalRevenue}`,
              },
              tooltip: {
                renderer: ({ datum }) => ({
                    content: `${datum.productName}: ₹${datum.totalRevenue}`, // Tooltip with ₹ symbol
                }),
            },
            },
           
        ],
    });

    useEffect(() => {
        const fetchProductSales = async () => {
            try {
                if (currentUser) {
                    const response = await axios.get(
                        `http://localhost:4000/server/sales/get-sale-farmer/${currentUser.sellerId}`
                    );
                    const transformedData = response.data.data.map(item => ({
                        productName: item.productName,
                        totalRevenue: item.totalRevenue,
                    }));
                    console.log(transformedData)
                    setSalesData(transformedData);
                }
            } catch (err) {
                console.error("Error fetching product sales data:", err);
                setError(err.message);
            }
        };

        fetchProductSales();
    }, [currentUser]);

    useEffect(() => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            data: salesData,
        }));
    }, [salesData]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!salesData.length) {
        return <div>No sales data available</div>;
    }

    return (
        <div className="chart-container">
            <AgCharts options={options} />
        </div>
        
    );
};

export default Sales;
