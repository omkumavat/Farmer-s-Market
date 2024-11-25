import React, { useState } from "react";
import "../SOLCSS/Farminspection.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Farm Inspection");
  const navigate = useNavigate();
  const handleLinkClick = (link,path) => {
    setActiveLink(link);
    navigate(path);
  };

  return (
    <>
      <NavBar />
      <div className="maincont">
        {/* Hero Section */}
        <div className="hero">
          <h1>Farm Inspection</h1>
          <p>VERDICA SOLUTIONS</p>
        </div>

        {/* Content Section */}
        <div className="contss">
          {/* Sidebar and Image Container */}
          <div className="sidebarconts">
            {/* Sidebar */}
            <div className="sidess">
              <ul>
                {[
                 { name: "Land Preservation", path: "/land-preservation" },
                 { name: "Farm Plans", path: "/farm-plans" },
                 { name: "Farm Inspection", path: "/farm-inspection" },
                 { name: "Soil Analysis", path: "/soil-analysis" },
                 { name: "Equipment Installation", path: "/equipment-installation" },
                 { name: "Water Management", path: "/water-management" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className={`itemsides ${activeLink === item.name ? "active" : ""}`}
                    onClick={() => handleLinkClick(item.name,item.path)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image to the right of Sidebar */}
            <div className="sidebarimgs"></div>
          </div>

          {/* Main Content */}
          <div className="mainsections">
            <h2>The Agricultural Engineering Provided by VERDICA</h2>
            <div className="equip">
              <p>
              Farm inspection is a critical process that ensures agricultural practices meet established standards for quality, safety, and sustainability. It involves a detailed evaluation of farm operations, equipment, and outputs to identify areas of improvement, assess compliance with regulations, and promote best practices. Farm inspections are essential for maintaining high performance, enhancing productivity, and ensuring the health of both crops and livestock.
              </p>
              <p>
              At VERDICA, we revolutionize farm inspections by providing a seamless and efficient platform designed to meet the unique needs of farmers. Our technology-driven approach connects farmers with experienced inspectors and equips them with cutting-edge tools to ensure thorough evaluations and actionable insights.
              </p>
            </div>

            {/* Why Choose Agros Section */}
            <div className="why-choose-agros">
              <h3>Why Choose VERDICA</h3>
              <div className="features">
                {/* Innovation Technology */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Innovation Technology Icon"
                    className="feature-icon"
                  />
                  <h4>Comprehensive Inspections</h4>
                  <p>
                    At VERDICA, we connect farmers with experienced and certified farm inspectors who provide detailed, thorough evaluations of crops, soil, equipment, and infrastructure, ensuring no issue goes unnoticed.
                  </p>
                </div>

                {/* Qualified Farmers */}
                <div className="feature">
                  <img
                    src={agricultureImage}
                    alt="Qualified Farmers Icon"
                    className="feature-icon"
                  />
                  <h4>Actionable Insights</h4>
                  <p>
                    We offer detailed inspection reports with clear recommendations, helping farmers take proactive steps to improve their operations, increase productivity, and prevent costly problems.
                  </p>
                </div>

                {/* Extended Warranty */}
                <div className="feature">
                  <img
                    src={shieldImage}
                    alt="Extended Warranty Icon"
                    className="feature-icon"
                  />
                  <h4>Easy Access to Experts</h4>
                  <p>
                    Verdica makes it simple to connect with qualified farm inspectors, ensuring you get expert advice and solutions tailored to your farm's unique needs.
                  </p>
                </div>

                {/* Awarded Company */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Awarded Company Icon"
                    className="feature-icon"
                  />
                  <h4>Data-Driven Solutions</h4>
                  <p>
                    Using advanced technology, we collect and analyze data from inspections to provide farmers with data-driven insights for continuous improvement and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Solutions1;
