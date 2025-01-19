import React, { useState } from "react";
import "../SOLCSS/Equipmentinstallation.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";
import { useNavigate } from "react-router-dom";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Soil Analysis");
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
          <h1>Soil Analysis</h1>
          <p>AgriHaven SOLUTIONS</p>
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
                  { name: "Water Management", path: "/water-management" },                 ].map((item) => (
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
            <div className="sidebarimgs">
              <img
                src={`${process.env.PUBLIC_URL}/Images/homeimages/soil.jpg`}
                alt="Equipment Installation"
                className="sidebar-image"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="mainsections">
  <h2>The Agricultural Engineering Provided by AgriHaven</h2>
  <div className="equip">
    <p>
      **Soil Analysis** is the process of evaluating the physical, chemical, and biological properties of soil to determine its health and suitability for agricultural activities. It involves testing for essential nutrients such as nitrogen, phosphorus, and potassium, as well as analyzing pH levels, moisture content, texture, organic matter, and soil microbiota. By understanding these factors, farmers can gain valuable insights into soil fertility and overall condition, enabling them to make data-driven decisions that improve crop productivity and sustainability.
    </p>
    <p>
      One of the key aspects of soil analysis is identifying deficiencies or imbalances in nutrients. For instance, if the soil is deficient in a particular nutrient, farmers can amend it with the right fertilizers or soil conditioners. Similarly, if the soil is too acidic or alkaline, adjustments can be made to create the ideal environment for specific crops.
    </p>
    <p>
      In addition to improving productivity, soil analysis also helps in managing soil erosion, preventing nutrient runoff, and maintaining the overall health of the land. By understanding the soil's structure and its ability to retain moisture, farmers can optimize irrigation systems, avoid overwatering, and reduce the risk of waterlogging, ensuring healthier crops and better yields.
    </p>
    <p>
      Regular soil testing is essential for sustainable farming practices. It not only helps to monitor soil health over time but also supports long-term environmental stewardship. By adjusting farming practices based on soil data, farmers can reduce the need for excessive chemical inputs, minimize environmental impact, and ensure that the land remains productive for future generations.
    </p>
    <p>
      At AgriHaven, we empower farmers to make informed decisions through accurate and comprehensive soil analysis. Our platform connects you with advanced testing tools and expert guidance to evaluate your soil’s health, optimize crop selection, and enhance fertility sustainably. We provide tailored recommendations that allow you to improve soil quality, reduce costs, and boost productivity. Our mission is to help you make the most of your land and cultivate a sustainable future for your farm.
    </p>
  
</div>


            {/* Why Choose Agros Section */}
            <div className="why-choose-agros">
              <h3>Why Choose AgriHaven</h3>
              <div className="features">
                {/* Innovation Technology */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Innovation Technology Icon"
                    className="feature-icon"
                  />
                  <h4>Accurate and Comprehensive Testing
                  </h4>
                  <p>
                  Evaluate critical soil parameters, including nutrient content, pH levels, moisture, and organic matter.
                  Identify deficiencies and imbalances to create tailored improvement plans.
                  </p>
                </div>

                {/* Qualified Farmers */}
                <div className="feature">
                  <img
                    src={agricultureImage}
                    alt="Qualified Farmers Icon"
                    className="feature-icon"
                  />
                  <h4>Expert Recommendations</h4>
                  <p>
                  Receive actionable insights from agricultural specialists to address soil challenges effectively.
                  Optimize crop selection, fertilizer application, and resource management.
                  </p>
                </div>

                {/* Extended Warranty */}
                <div className="feature">
                  <img
                    src={shieldImage}
                    alt="Extended Warranty Icon"
                    className="feature-icon"
                  />
                  <h4>Advanced Technology</h4>
                  <p>
                  Leverage cutting-edge tools like GIS mapping and remote sensing for detailed soil analysis.
                  Access easy-to-understand visualizations and real-time updates on soil health.
                  </p>
                </div>

                {/* Awarded Company */}
                <div className="feature">
                  <img
                    src={farmingImage}
                    alt="Awarded Company Icon"
                    className="feature-icon"
                  />
                  <h4>Cost-Effective Farming</h4>
                  <p>
                    Reduce input costs by applying precise amounts of fertilizers and water based on soil requirements.
Avoid overuse of resources while maximizing yields and profitability.
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
