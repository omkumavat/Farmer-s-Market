import React, { useState } from "react";
import "../SOLCSS/Farmplans.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Farm Plans");

  const handleLinkClick = (link) => {
    setActiveLink(link);
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
                    key={item}
                    className={`itemsides ${
                      activeLink === item ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image to the right of Sidebar */}
            <div className="sidebarimgs"></div>
          </div>

          {/* Main Content */}
          <div className="mainsections">
            <h2>The Agricultural Engineering Provided by Agros</h2>
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
              <h3>Why Choose Agros</h3>
              <div className="features">
                {/* Innovation Technology */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Innovation Technology Icon"
                    className="feature-icon"
                  />
                  <h4>Innovation Technology</h4>
                  <p>
                    The Industrial is responsible for minor and the codes
                    security in hotel Ecosystem for Food and Cleaner through.
                  </p>
                </div>

                {/* Qualified Farmers */}
                <div className="feature">
                  <img
                    src={agricultureImage}
                    alt="Qualified Farmers Icon"
                    className="feature-icon"
                  />
                  <h4>Qualified Farmers</h4>
                  <p>
                    Our aim is to keep the house clean – your aim will help!
                    Through Digital Innovation World Summit.
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
                  <h4>Awarded Company</h4>
                  <p>
                    We are a company dedicated to giving our customers back
                    the time they deserve to enjoy the things they love.
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
