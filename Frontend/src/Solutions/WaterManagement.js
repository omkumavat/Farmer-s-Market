import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../SOLCSS/WaterManagement.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Water Management");
  const navigate = useNavigate(); // Hook for navigation

  const handleLinkClick = (link, route) => {
    setActiveLink(link);
    navigate(route); // Redirect to the corresponding route
  };

  return (
    <>
      <NavBar />
      <div className="maincont">
        {/* Hero Section */}
        <div className="hero">
          <h1>Water Management</h1>
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
                  { name: "Land Preservation", route: "/land-preservation" },
                  { name: "Farm Plans", route: "/farm-plans" },
                  { name: "Farm Inspection", route: "/farm-inspection" },
                  { name: "Soil Analysis", route: "/soil-analysis" },
                  { name: "Equipment Installation", route: "/equipment-installation" },
                  { name: "Water Management", route: "/water-management" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className={`itemsides ${
                      activeLink === item.name ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(item.name, item.route)}
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
                Water management in agriculture focuses on the effective use, conservation, and distribution of water resources to optimize crop production while ensuring sustainability. This involves techniques like drip irrigation, rainwater harvesting, soil moisture monitoring, and canal systems to deliver water efficiently. Proper water management enhances crop yield, prevents water wastage, and mitigates issues like waterlogging and soil erosion, contributing to long-term agricultural productivity and environmental balance.
              </p>
              <p>
                At Verdica, we simplify water management for farmers by connecting them with trusted dealers offering advanced irrigation systems and tools. Our platform ensures that farmers receive expert guidance, high-quality products, and tailored solutions to address specific water challenges on their farms. By facilitating seamless access to resources, we help farmers achieve water efficiency and improved crop growth.
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
                  <h4>Tailored Solutions for Farmers</h4>
                  <p>
                    We provide a wide range of water management tools and systems that cater to diverse farming needs, ensuring every farmer finds the perfect fit for their field.
                  </p>
                </div>

                {/* Sustainability-Focused Solutions */}
                <div className="feature">
                  <img
                    src={agricultureImage}
                    alt="Qualified Farmers Icon"
                    className="feature-icon"
                  />
                  <h4>Sustainability-Focused Solutions</h4>
                  <p>
                    VERDICA emphasizes eco-friendly practices, promoting techniques like drip irrigation and rainwater harvesting to conserve water and protect the environment.
                  </p>
                </div>

                {/* Trusted Dealer Network */}
                <div className="feature">
                  <img
                    src={shieldImage}
                    alt="Extended Warranty Icon"
                    className="feature-icon"
                  />
                  <h4>Trusted Dealer Network</h4>
                  <p>
                    Verdica collaborates with reputable dealers, ensuring that farmers receive only high-quality, reliable irrigation equipment.
                  </p>
                </div>

                {/* Affordable Pricing */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Awarded Company Icon"
                    className="feature-icon"
                  />
                  <h4>Affordable and Transparent Pricing</h4>
                  <p>
                    Verdica ensures competitive pricing and transparent dealings, enabling farmers to maximize their investments without overspending.
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
