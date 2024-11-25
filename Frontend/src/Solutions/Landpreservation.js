import React, { useState } from "react";
import "../SOLCSS/Landpreservation.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";
import { useNavigate } from "react-router-dom";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Land Preservation");
  const navigate=useNavigate();
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
          <h1>Land Preservation</h1>
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
                  { name: "Water Management", path: "/water-management" },                ].map((item) => (
                  <li
                    key={item}
                    className={`itemsides ${
                      activeLink === item.name ? "active" : ""
                    }`}
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
            Land preservation focuses on protecting and maintaining natural landscapes, agricultural lands, and ecosystems for future generations. It involves sustainable practices to prevent soil erosion, combat deforestation, conserve water resources, and promote biodiversity. By implementing strategies like controlled land use, reforestation, and soil management, land preservation helps maintain the ecological balance, support agriculture, and mitigate environmental degradation. It ensures that land remains fertile, productive, and resilient against the impacts of urbanization and climate change.
            </p>
            <p>
            At VERDICA, we prioritize sustainable farming practices by empowering farmers with tools and strategies to preserve their land for future generations. Our platform helps farmers implement eco-friendly methods to protect soil health, conserve water, and maintain biodiversity, ensuring long-term productivity and environmental balance.
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
                  <h4>Expert Guidance</h4>
                  <p>
                  Work with agricultural and environmental experts who provide insights on preserving soil health and natural resources.
                  </p>
                </div>

                {/* Qualified Farmers */}
                <div className="feature">
                  <img
                    src={agricultureImage}
                    alt="Qualified Farmers Icon"
                    className="feature-icon"
                  />
                  <h4>Advanced Monitoring Tools</h4>
                  <p>
                  Leverage cutting-edge technology to track soil quality, moisture levels, and biodiversity.
                  Make data-driven decisions to prevent overuse of resources and maintain ecological balance.
                  </p>
                </div>

                {/* Extended Warranty */}
                <div className="feature">
                  <img
                    src={shieldImage}
                    alt="Extended Warranty Icon"
                    className="feature-icon"
                  />
                  <h4>Extended Warranty</h4>
                  <p>
                    Both of us take a lot of time in getting cleaned and
                    beautified Clean Home. Professional Service.
                  </p>
                </div>

                {/* Awarded Company */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Awarded Company Icon"
                    className="feature-icon"
                  />
                  <h4>Sustainability Focus</h4>
                  <p>
                  Adopt eco-friendly practices that reduce environmental impact while boosting productivity.
                  Preserve your land’s value and health for future farming endeavors.
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
