import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../SOLCSS/Equipmentinstallation.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";


// Importing images from the `src` folder
import farmingImage from "../Images/farming-2.png";
import agricultureImage from "../Images/agriculture-2.png";
import shieldImage from "../Images/secure-shield.png";
// import equipmentImage from "../Images/homeimages/equip.jpg";
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
                    className={`itemsides ${activeLink === item.name ? "active" : ""
                      }`}
                    onClick={() => handleLinkClick(item.name, item.path)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebarimgs">
              <img
                src={`${process.env.PUBLIC_URL}/Images/homeimages/equip.jpg`}
                alt="Equipment Installation"
                className="sidebar-image"
              />
            </div>
          </div>

      
          <div className="mainsections">
            <h2>The Agricultural Engineering Provided by AgriHaven</h2>
            <div className="equip">
              <p>
                **Farm Equipment Installation** is a vital process in modern agriculture, involving the setup and configuration of machinery and tools essential for efficient and sustainable farming operations. The process includes selecting the right equipment that matches the farm’s specific needs, optimizing the layout of machinery, and ensuring that everything is installed and configured for peak performance. Effective installation is not just about assembly; it also involves integration with existing farm systems to ensure compatibility and streamline operations.
              </p>
              <p>
                Some common installations on modern farms include:
              </p>
              <ul>
                <li><strong>Irrigation Systems</strong>: Setting up drip or sprinkler systems to ensure water is delivered efficiently to crops, reducing wastage and improving yield.</li>
                <li><strong>Tractors and Harvesters</strong>: Installing and calibrating tractors, plows, and harvesters that enable farmers to maximize productivity while reducing labor costs.</li>
                <li><strong>Seeders and Planters</strong>: Configuring seeding machinery to optimize planting depth, spacing, and soil coverage for better crop emergence.</li>
                <li><strong>Precision Farming Technologies</strong>: Installing sensors, GPS systems, and automated equipment that monitor crop health, soil conditions, and climate, ensuring precise application of resources and enhancing yield management.</li>
                <li><strong>Storage Systems</strong>: Ensuring proper installation of storage facilities for grains, seeds, and other harvest products, minimizing spoilage and extending shelf life.</li>
              </ul>
              <p>
                **Proper equipment installation** ensures that machinery operates at maximum efficiency, reducing downtime and maintenance costs. It also contributes to better crop yields and optimized resource use. Proper setup and calibration lead to increased productivity, less human intervention, and a more sustainable farming operation. Moreover, farm equipment installation ensures that the technology is safe to use and adheres to operational and safety standards, which reduces the risk of accidents and failures.
              </p>
              <p>
                At **AgriHaven**, we connect farmers with trusted, high-quality dealers and offer expert guidance for equipment installation. Our platform makes it easier for farmers to find the right tools and machinery that are perfectly suited to their farm's size, type of crops, and operational goals. We offer assistance through the entire installation process, from selecting equipment to training farmers on its use and ensuring systems are properly integrated and functional.
              </p>
              <p>
                By leveraging **AgriHaven’s network of trusted dealers**, farmers have access to a wide range of advanced equipment designed to improve efficiency, reduce costs, and boost farm productivity. These dealers provide not only quality products but also after-sales support, maintenance services, and installation expertise, ensuring farmers have the resources they need to succeed.
              </p>
              <p>
                **Why is Equipment Installation Important?**
              </p>
              <ul>
                <li><strong>Enhanced Productivity</strong>: Properly installed equipment allows for faster, more efficient work, increasing the overall output of the farm.</li>
                <li><strong>Minimized Waste</strong>: Efficient systems reduce resource wastage, such as water, seeds, and fertilizers, contributing to sustainable farming practices.</li>
                <li><strong>Cost-Effective</strong>: Installing equipment correctly from the beginning reduces maintenance costs, improves lifespan, and maximizes the return on investment (ROI).</li>
                <li><strong>Compliance with Regulations</strong>: Proper installation ensures that machinery and systems comply with safety regulations and environmental standards, avoiding penalties and improving farm reputation.</li>
              </ul>
              <p>
                Additionally, our platform supports farmers by offering **customized solutions**. Whether it’s a small farm or a large-scale commercial operation, AgriHaven ensures farmers have access to the best technology and expertise. By partnering with us, farmers gain a competitive edge, accessing the latest in farming technology that can transform operations and help achieve greater sustainability.
              </p>
              <p>
                At AgriHaven, we’re not just about installing equipment; we’re about empowering farmers with the tools, knowledge, and support to thrive in the modern agricultural landscape. From product selection and installation to training and ongoing maintenance, our mission is to ensure that farmers have everything they need to operate efficiently and sustainably. With our seamless equipment acquisition process, AgriHaven is helping farmers achieve success, one installation at a time.
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
