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
            <div className="sidebarimgs">
              <img
                src={`${process.env.PUBLIC_URL}/Images/homeimages/land.jpeg`}
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
      **Land Preservation** focuses on protecting and maintaining natural landscapes, agricultural lands, and ecosystems to ensure that they remain healthy and productive for future generations. This process is crucial for maintaining the balance between agriculture and the environment. Land preservation practices involve:
    </p>
    <ul>
      <li><strong>Preventing Soil Erosion</strong>: Erosion can lead to the loss of fertile topsoil, which is essential for crop production. Techniques such as contour farming, terracing, and planting cover crops can help prevent soil erosion and protect the land.</li>
      <li><strong>Combating Deforestation</strong>: Sustainable land management involves preventing deforestation and promoting afforestation and reforestation efforts to ensure adequate tree cover and reduce the effects of climate change.</li>
      <li><strong>Conserving Water Resources</strong>: Efficient water use and conservation methods, including rainwater harvesting, irrigation systems, and water-efficient cropping systems, help preserve water resources for future use while enhancing crop yield.</li>
      <li><strong>Promoting Biodiversity</strong>: Land preservation supports biodiversity by encouraging the planting of native vegetation, preserving natural habitats, and reducing monoculture farming, which can harm the local ecosystem.</li>
    </ul>
    <p>
      By implementing these strategies, land preservation not only helps maintain the ecological balance but also supports sustainable agricultural practices that are vital for long-term food production and environmental health. Land that is preserved through sustainable practices can remain fertile, productive, and resilient against the impacts of urbanization and climate change.
    </p>
    <p>
      At **VERDICA**, we are committed to supporting sustainable farming practices by providing farmers with the tools, knowledge, and resources necessary for land preservation. Our platform connects farmers with eco-friendly methods to protect soil health, manage water resources efficiently, and promote biodiversity. We empower farmers to adopt conservation strategies that enhance land productivity, ensuring that the land remains healthy and productive for future generations.
    </p>
    <p>
      Whether it's through advanced soil management techniques, sustainable irrigation systems, or biodiversity-promoting farming practices, Verdica helps farmers integrate environmental stewardship into their farming operations. By focusing on long-term land health, we aim to help farmers achieve greater productivity while also contributing to the overall ecological well-being of the land.
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
