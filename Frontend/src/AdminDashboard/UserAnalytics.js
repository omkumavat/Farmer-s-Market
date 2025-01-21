import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Use Bar instead of Line for Bar chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../AdminDashboardCSS/useranalytics.css';

// Register chart.js components for Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserAnalytics = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [farmer, setFarmer] = useState(0);
  const [dealer, setDealer] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await fetch('http://localhost:4000/server/count');
      const data = await response.json();
      setUserCount(data.userCount);
      setOrderCount(data.orderCount);
      setFarmer(data.farmer);
      setDealer(data.Dealer);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching counts', error);
      setLoading(false);
    }
  };

  // X-axis represents categories and Y-axis represents the count for each category
  const barChartData = {
    labels: ['Total Users', 'Happy Farmers', 'Happy Dealers', 'Total Orders'], // Categories on X-axis
    datasets: [
      {
        label: 'Count', // Label for the data
        data: [userCount, farmer, dealer, orderCount], // Integer counts on Y-axis
        backgroundColor: 'rgba(20, 233, 233, 0.91)', // Light background color for bars
        borderColor: 'rgb(15, 240, 240)', // Border color for bars
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="user-analytics-container">
      <h1>User Analytics</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="analytics-dashboard">
          <div className="analytics-card">
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </div>
          <div className="analytics-card">
            <h3>Happy Farmers</h3>
            <p>{farmer}</p>
          </div>
          <div className="analytics-card">
            <h3>Happy Dealers</h3>
            <p>{dealer}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Orders Placed</h3>
            <p>{orderCount}</p>
          </div>
          <div className="analytics-chart">
            <Bar data={barChartData} /> {/* Using Bar chart here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
