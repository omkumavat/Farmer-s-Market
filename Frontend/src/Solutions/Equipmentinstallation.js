import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../SOLCSS/Equipmentinstallation.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Equipment Installation");
  const navigate = useNavigate(); // React Router navigation hook

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    navigate(path); // Navigate to the specified path
  };

  return (
    <>
      <NavBar />
      <div className="maincont">
        {/* Hero Section */}
        <div className="hero">
          <h1>Equipment Installation</h1>
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
                    className={`itemsides ${
                      activeLink === item.name ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(item.name, item.path)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebarimgs"></div>
          </div>

          {/* Main Content */}
          <div className="mainsections">
            <h2>The Agricultural Engineering Provided by VERDICA</h2>
            <div className="equip">
              <p>
                Farm equipment installation involves the setup and configuration
                of essential machinery and tools required for efficient
                agricultural operations. This process includes selecting
                appropriate equipment based on the farm's size and needs,
                ensuring proper assembly, and configuring systems for optimal
                performance. Common installations include irrigation systems,
                tractors, seeders, harvesters, and precision farming
                technologies. Proper equipment installation improves
                productivity, reduces manual labor, and ensures sustainable
                farming practices while adhering to safety and operational
                guidelines.
              </p>
              <p>
                At Verdica, we connect farmers with reliable dealers for
                high-quality equipment and offer guidance on installation
                services. Farmers can explore a wide range of tools suited to
                their needs, while dealers benefit from a trusted platform to
                reach their customers. By bridging this gap, our website
                promotes seamless equipment acquisition and setup, ensuring
                farmers get the best solutions for their fields.
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
                  <h4>Wide Selection of Equipment</h4>
                  <p>
                    Access a diverse range of farm equipment from trusted
                    dealers tailored to meet every farmer's unique needs.
                  </p>
                </div>

                {/* Qualified Farmers */}
                <div className="feature">
                  <img
                    src={agricultureImage}
                    alt="Qualified Farmers Icon"
                    className="feature-icon"
                  />
                  <h4>Trusted Dealer Network</h4>
                  <p>
                    We partner with reliable dealers, ensuring high-quality
                    products and transparent pricing.
                  </p>
                </div>

                {/* Extended Warranty */}
                <div className="feature">
                  <img
                    src={shieldImage}
                    alt="Extended Warranty Icon"
                    className="feature-icon"
                  />
                  <h4>Easy Access to Services</h4>
                  <p>
                    From purchase to installation, our platform offers
                    end-to-end support for a hassle-free experience.
                  </p>
                </div>

                {/* Awarded Company */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Awarded Company Icon"
                    className="feature-icon"
                  />
                  <h4>Affordable Pricing</h4>
                  <p>
                    Competitive rates to help farmers maximize their
                    investments.
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
