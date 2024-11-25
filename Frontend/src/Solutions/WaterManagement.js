import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../SOLCSS/Equipmentinstallation.css";
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
            <div className="sidebarimgs">
              <img
                src={`${process.env.PUBLIC_URL}/Images/homeimages/water.jpg`}
                alt="Equipment Installation"
                className="sidebar-image"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="mainsections">
  <h2>The Agricultural Engineering Provided by VERDICA</h2>
  <div className="equip">
    <p>
      **Water Management** in agriculture focuses on the effective use, conservation, and distribution of water resources to optimize crop production while ensuring sustainability. It is essential for maintaining healthy crops and increasing agricultural productivity. Water management techniques include:
    </p>
    <ul>
      <li><strong>Drip Irrigation</strong>: A highly efficient method that delivers water directly to the plant roots, reducing evaporation and runoff while conserving water.</li>
      <li><strong>Rainwater Harvesting</strong>: The practice of collecting and storing rainwater for irrigation purposes, minimizing reliance on groundwater or external water sources.</li>
      <li><strong>Soil Moisture Monitoring</strong>: Using sensors and technologies to measure soil moisture levels in real time, helping farmers irrigate crops only when necessary, thus conserving water and reducing waste.</li>
      <li><strong>Canal Systems</strong>: Designed to carry water from water sources to agricultural lands, canal systems help deliver water efficiently, especially in large-scale farming operations.</li>
    </ul>
    <p>
      Proper water management not only enhances crop yield but also helps in mitigating issues like waterlogging, soil erosion, and salinization. Water efficiency directly contributes to improved soil quality and promotes sustainable farming practices. By minimizing water wastage, farmers can reduce costs and maintain long-term crop productivity. Furthermore, sustainable water practices help in conserving water resources, ensuring their availability for future generations.
    </p>
    <p>
      At Verdica, we understand the importance of efficient water management for farming success. We simplify this process by connecting farmers with trusted dealers offering advanced irrigation systems and water management tools. From low-cost, high-efficiency drip systems to smart water-saving technologies, our platform ensures farmers have access to innovative solutions tailored to their specific water challenges.
    </p>
    <p>
      In addition to providing top-quality equipment, Verdica’s platform also offers expert guidance to help farmers optimize their irrigation practices. Whether it's adjusting irrigation schedules based on seasonal rainfall or selecting the right irrigation method for various crop types, we provide the resources needed to enhance water efficiency and crop health.
    </p>
    <p>
      With access to real-time data and analysis, farmers can make better-informed decisions regarding water usage, ensuring that their farms are productive, profitable, and sustainable. Verdica is committed to facilitating seamless access to these essential resources, helping farmers achieve optimal water management and improved crop growth, while contributing to the long-term health of the environment.
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
