import React, { useState } from "react";
import "../SOLCSS/Equipmentinstallation.css";
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
            <div className="sidebarimgs">
              <img
                src={`${process.env.PUBLIC_URL}/Images/homeimages/inspection.jpg`}
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
      **Farm Inspection** is a critical process that ensures agricultural operations meet established standards for quality, safety, and sustainability. It involves a comprehensive evaluation of all aspects of farm management, from soil health and crop quality to the functionality of equipment and the condition of livestock. Regular inspections help identify areas for improvement, ensure compliance with local regulations, and promote best practices to increase productivity and minimize risks.
    </p>
    <p>
      A farm inspection typically covers several key areas:
    </p>
    <ul>
      <li><strong>Soil Health</strong>: Assessing soil quality, including pH, nutrient levels, and organic matter content, to ensure crops can thrive and grow sustainably.</li>
      <li><strong>Crop Quality</strong>: Inspecting crops for pest infestations, diseases, and proper growth stages to ensure high yield and quality harvests.</li>
      <li><strong>Livestock Health</strong>: Evaluating the health and welfare of livestock, ensuring proper feeding, shelter, and disease prevention practices.</li>
      <li><strong>Equipment Condition</strong>: Checking farm machinery and tools to ensure they are in good working condition and meet safety standards.</li>
      <li><strong>Compliance with Regulations</strong>: Ensuring the farm adheres to environmental laws, food safety regulations, and local agricultural standards.</li>
    </ul>
    <p>
      Farm inspections are essential for ensuring that farming operations are sustainable, safe, and efficient. Regular assessments help farmers maintain optimal performance, reduce operational risks, and improve overall productivity. Inspections also provide farmers with the information needed to make informed decisions about necessary improvements and investments.
    </p>
    <p>
      At **VERDICA**, we revolutionize the farm inspection process by offering a seamless and efficient platform that meets the unique needs of farmers. Our technology-driven approach connects farmers with experienced inspectors and provides them with advanced tools to conduct thorough evaluations. We offer:
    </p>
    <ul>
      <li><strong>Expert Inspections</strong>: Our platform connects farmers with certified inspectors who have extensive knowledge of best practices and industry standards.</li>
      <li><strong>Real-Time Reports</strong>: Farmers receive detailed inspection reports in real time, with actionable insights and recommendations for improving their operations.</li>
      <li><strong>Custom Solutions</strong>: Based on inspection findings, we provide tailored solutions that help farmers optimize their practices, improve efficiency, and achieve sustainability goals.</li>
      <li><strong>Regulatory Compliance</strong>: Our service ensures that farms remain compliant with local regulations, helping avoid penalties and improve market access.</li>
    </ul>
    <p>
      With **VERDICA**, farm inspections become a valuable tool for continuous improvement. Our platform simplifies the process, empowering farmers with the knowledge and resources needed to maintain high-quality operations, increase productivity, and promote long-term sustainability. Through our inspections, farmers can optimize their resources, improve crop and livestock health, and enhance their business's overall performance.
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
