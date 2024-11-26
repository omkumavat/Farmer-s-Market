// import React from 'react';
// import '../CSS/team.css';
// import NavBar from '../Components/NavBar';
// import Footer from "../Components/Footer";
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing icons from react-icons

// const Team = () => {
//   return (
//     <>
//       <NavBar />
//       <div className="team-container">
//         <h2 className="team-heading">Meet Our Team</h2>
//         <div className="team-members">
//           <div className="team-member">
//             <div className="team-image-container"></div>
//             <h3 className="team-name">John Doe</h3>
//             <p className="team-role">CEO</p>
//             <p className="team-description">John is the founder and visionary behind our company.</p>
//             <div className="social-icons">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
//               <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//             </div>
//           </div>

//           <div className="team-member">
//             <div className="team-image-container"></div>
//             <h3 className="team-name">Jane Smith</h3>
//             <p className="team-role">CTO</p>
//             <p className="team-description">Jane leads the technical department and product development.</p>
//             <div className="social-icons">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
//               <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//             </div>
//           </div>

//           <div className="team-member">
//             <div className="team-image-container"></div>
//             <h3 className="team-name">Emily Brown</h3>
//             <p className="team-role">COO</p>
//             <p className="team-description">Emily oversees day-to-day operations and ensures smooth business flow.</p>
//             <div className="social-icons">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
//               <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//             </div>
//           </div>

//           <div className="team-member">
//             <div className="team-image-container"></div>
//             <h3 className="team-name">Michael Lee</h3>
//             <p className="team-role">Marketing Head</p>
//             <p className="team-description">Michael is responsible for driving our brand and marketing strategies.</p>
//             <div className="social-icons">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
//               <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Team;


import React from 'react';
import '../CSS/team.css';
import NavBar from '../Components/NavBar';
import Footer from "../Components/Footer";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing icons from react-icons

const Team = () => {
  return (
    <>
      <NavBar />
      {/* Team Header Section */}
      <div className="team-header">
        <h2>Meet Our Team</h2>
        <p>GET TO KNOW US</p>
      </div>

      <div className="team-container">
        <div className="team-members">
          <div className="team-member">
            <div className="team-image-container"></div>
            <h3 className="team-name">John Doe</h3>
            <p className="team-role">CEO</p>
            <p className="team-description">John is the founder and visionary behind our company.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>

          <div className="team-member">
            <div className="team-image-container"></div>
            <h3 className="team-name">Jane Smith</h3>
            <p className="team-role">CTO</p>
            <p className="team-description">Jane leads the technical department and product development.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>

          <div className="team-member">
            <div className="team-image-container"></div>
            <h3 className="team-name">Emily Brown</h3>
            <p className="team-role">COO</p>
            <p className="team-description">Emily oversees day-to-day operations and ensures smooth business flow.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>

          <div className="team-member">
            <div className="team-image-container"></div>
            <h3 className="team-name">Michael Lee</h3>
            <p className="team-role">Marketing Head</p>
            <p className="team-description">Michael is responsible for driving our brand and marketing strategies.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
