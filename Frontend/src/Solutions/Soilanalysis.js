import React, { useState } from "react";
import "../SOLCSS/Soilanalysis.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Land Preservation");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <NavBar />
      <div className="main-container">
        {/* Hero Section */}
        <div className="hero">
          <h1>Land Preservation</h1>
          <p>AGROS SOLUTION</p>
        </div>

        {/* Content Section */}
        <div className="content">
          {/* Sidebar and Image Container */}
          <div className="sidebar-container">
            {/* Sidebar */}
            <div className="sidebar">
              <ul>
                {[
                  "Land Preservation",
                  "Farm Plans",
                  "Farm Inspection",
                  "Soil Analysis",
                  "Equipment Installation",
                  "Water Management",
                ].map((item) => (
                  <li
                    key={item}
                    className={`sidebar-item ${
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
            <div className="sidebar-image"></div>
          </div>

          {/* Main Content */}
          <div className="main-section">
            <h2>The Agricultural Engineering Provided by Agros</h2>
            <p>
              The vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>

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
