// import React, { useState } from "react";
// import "../CSS/solutions1.css";

// function Solutions1() {
//   const [activeLink, setActiveLink] = useState("Land Preservation");

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };

//   return (
//     <div className="main-container">
//       {/* Hero Section */}
//       <div className="hero">
//         <h1>Land Preservation</h1>
//         <p>AGROS SOLUTION</p>
//       </div>

//       {/* Content Section */}
//       <div className="content">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <ul>
//             {[
//               "Land Preservation",
//               "Farm Plans",
//               "Farm Inspection",
//               "Soil Analysis",
//               "Equipment Installation",
//               "Water Management",
//             ].map((item) => (
//               <li
//                 key={item}
//                 className={`sidebar-item ${
//                   activeLink === item ? "active" : ""
//                 }`}
//                 onClick={() => handleLinkClick(item)}
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="main-section">
//           <img
//             src="../assets/bgimage.jpg"
//             alt="Agriculture"
//             className="main-image"
//           />
//           <h2>The Agricultural Engineering Provided by Agros</h2>
//           <p>
//             The vero eos et accusamus et iusto odio dignissimos ducimus qui
//             blanditiis praesentium voluptatum deleniti atque corrupti quos
//             dolores et quas molestias excepturi sint occaecati cupiditate non
//             provident.
//           </p>
//           <p>
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem
//             accusantium doloremque laudantium, totam rem aperiam.
//           </p>

//           {/* Why Choose Agros Section */}
//           <h3>Why Choose Agros</h3>
//           <div className="features">
//             <div className="feature">
//               <i className="icon icon-tech"></i>
//               <h4>Innovation Technology</h4>
//               <p>
//                 The Industrial is responsible for minor and the codes security
//                 in hotel Ecosystem for Food and Cleaner through.
//               </p>
//             </div>
//             <div className="feature">
//               <i className="icon icon-farmer"></i>
//               <h4>Qualified Farmers</h4>
//               <p>
//                 Our aim is to keep the house clean – your aim will help! Through
//                 Digital Innovation World Summit.
//               </p>
//             </div>
//             <div className="feature">
//               <i className="icon icon-warranty"></i>
//               <h4>Extended Warranty</h4>
//               <p>
//                 Both of us take a lot of time in getting cleaned and beautified
//                 Clean Home. Professional Service.
//               </p>
//             </div>
//             <div className="feature">
//               <i className="icon icon-award"></i>
//               <h4>Awarded Company</h4>
//               <p>
//                 We are a company dedicated to giving our customers back the time
//                 they deserve to enjoy the things they love.
//               </p>
//             </div>
//           </div>

//           {/* Popular Tags Section */}
//           <div className="tags-section">
//             <h3>Popular Tags</h3>
//             <div className="tags">
//               <span className="tag">Agriculture</span>
//               <span className="tag">Soil</span>
//               <span className="tag">Water</span>
//               <span className="tag">Farm</span>
//               <span className="tag">Innovation</span>
//             </div>
//           </div>

//           {/* Follow On Us Section */}
//           <div className="follow-section">
//             <h3>Follow On Us</h3>
//             <div className="social-icons">
//               <i className="icon icon-facebook"></i>
//               <i className="icon icon-twitter"></i>
//               <i className="icon icon-instagram"></i>
//               <i className="icon icon-linkedin"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Solutions1;

import React, { useState } from "react";
import "../CSS/solutions1.css";

function Solutions1() {
  const [activeLink, setActiveLink] = useState("Land Preservation");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
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
          <h3>Why Choose Agros</h3>
          <div className="features">
            <div className="feature">
              <i className="icon icon-tech"></i>
              <h4>Innovation Technology</h4>
              <p>
                The Industrial is responsible for minor and the codes security
                in hotel Ecosystem for Food and Cleaner through.
              </p>
            </div>
            <div className="feature">
              <i className="icon icon-farmer"></i>
              <h4>Qualified Farmers</h4>
              <p>
                Our aim is to keep the house clean – your aim will help! Through
                Digital Innovation World Summit.
              </p>
            </div>
            <div className="feature">
              <i className="icon icon-warranty"></i>
              <h4>Extended Warranty</h4>
              <p>
                Both of us take a lot of time in getting cleaned and beautified
                Clean Home. Professional Service.
              </p>
            </div>
            <div className="feature">
              <i className="icon icon-award"></i>
              <h4>Awarded Company</h4>
              <p>
                We are a company dedicated to giving our customers back the time
                they deserve to enjoy the things they love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solutions1;
