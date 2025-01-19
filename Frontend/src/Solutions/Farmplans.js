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
            <div className="sidebarimgs">
              <img
                src={`${process.env.PUBLIC_URL}/Images/homeimages/farm.png`}
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
      **Farm Plans** are comprehensive strategies that help farmers manage the growth and development of their farm operations over time. A well-thought-out farm plan serves as a roadmap to guide farm activities, ensuring that all resources—land, labor, and capital—are used efficiently to meet both production and sustainability goals. These plans typically focus on:
    </p>
    <ul>
      <li><strong>Optimizing Land Use</strong>: A critical part of farm planning involves determining the most effective way to utilize available land. This includes crop rotation, intercropping, and zoning to make the best use of every hectare of land.</li>
      <li><strong>Enhancing Crop Yield</strong>: By analyzing soil health, water availability, climate patterns, and crop varieties, farm plans help identify the best strategies to maximize yields and minimize losses.</li>
      <li><strong>Ensuring Sustainable Practices</strong>: A farm plan incorporates eco-friendly methods such as organic farming, reduced pesticide use, and soil conservation techniques, promoting long-term environmental health.</li>
      <li><strong>Meeting Market Demand</strong>: A good farm plan helps farmers align their production with market needs, improving profitability by focusing on high-demand crops and ensuring timely harvesting and delivery.</li>
    </ul>
    <p>
      By planning strategically, farmers can address challenges proactively, reduce operational costs, and enhance farm sustainability. A well-structured farm plan also helps ensure that farming practices align with industry best practices and environmental regulations.
    </p>
    <p>
      At **AgriHaven**, we simplify the farm planning process by connecting farmers with expert advisors and providing advanced tools that enable efficient farm management. Our platform ensures farmers receive personalized plans and strategies that are based on data-driven insights, helping them achieve:
    </p>
    <ul>
      <li><strong>Resource Optimization</strong>: Using the right mix of fertilizers, water, and crop protection to maximize efficiency and reduce waste.</li>
      <li><strong>Improved Productivity</strong>: Streamlining farm operations, from planting to harvesting, with tailored advice on optimizing crop cycles and managing labor.</li>
      <li><strong>Sustainable Practices</strong>: Implementing practices that conserve resources, maintain soil health, and reduce the environmental footprint of farming.</li>
    </ul>
    <p>
      With **AgriHaven**, farm plans become more accessible, reliable, and tailored to meet the unique needs of each farm. Whether you are managing a small plot or a large-scale operation, our platform equips you with the right tools and expertise to transform your farm into a productive and sustainable business. Our goal is to help farmers make informed decisions, enhance their profitability, and contribute to a sustainable agricultural future.
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
