import React, { useState } from "react";
import "../SOLCSS/Farmplans.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";
import { useNavigate } from "react-router-dom";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Farm Plans");
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
          <h1>Farm Plans</h1>
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
            Farm plans are detailed strategies designed to guide the growth, development, and management of a farm over a specified period. These plans typically focus on optimizing land use, enhancing crop yield, ensuring sustainable farming practices, and meeting market demand. A well-structured farm plan is essential for improving operational efficiency, increasing profitability, and maintaining environmental sustainability. 
            </p>
            <p>
              At  Verdica, we simplify farm planning by connecting farmers with expert advisors and providing advanced tools for efficient farm management. Our platform ensures farmers receive personalized plans, comprehensive strategies, and actionable insights, helping them optimize resources, enhance productivity, and maintain sustainable practices. With Verdica, farm plans become more accessible, reliable, and tailored to meet the unique needs of each farm.
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
                  <h4>Personalized Farm Plans</h4>
                  <p>
                  We craft plans based on your farm’s specific needs, including soil type, climate, and crop preferences. Tailored strategies ensure maximum yield and resource optimization.
                  </p>
                </div>

                {/* Qualified Farmers */}
                <div className="feature">
                  <img
                    src={agricultureImage}
                    alt="Qualified Farmers Icon"
                    className="feature-icon"
                  />
                  <h4>Sustainability Focus</h4>
                  <p>
                  Promote eco-friendly practices to enhance soil health, conserve water, and reduce environmental impact.
                  Achieve compliance with sustainable farming standards and certifications.
                  </p>
                </div>

                {/* Extended Warranty */}
                <div className="feature">
                  <img
                    src={shieldImage}
                    alt="Extended Warranty Icon"
                    className="feature-icon"
                  />
                  <h4>Scalable Solutions</h4>
                  <p>
                  Whether you're managing a small family farm or a large-scale agribusiness, our solutions scale to meet your needs.
                  </p>
                </div>

                {/* Awarded Company */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Awarded Company Icon"
                    className="feature-icon"
                  />
                  <h4>Cost-Effective Approach</h4>
                  <p>
                  Save resources by optimizing inputs like water, fertilizers, and labor.
                  Increase profitability by focusing on high-yield crops and efficient management practices.
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
