
import React from 'react';
import '../CSS/team.css';
import NavBar from '../Components/NavBar';
import Footer from "../Components/Footer";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing icons from react-icons

const Team = () => {
  return (
    <>
      <NavBar />
      <div className="team-header">
        <h2>Meet Our Team</h2>
        <p>GET TO KNOW US</p>
      </div>

      <div className="team-container">
        <div className="team-members">
          <div className="team-member">
            <div className="team-image-container"></div>
            <h3 className="team-name">Shivaji Gadekar</h3>
            <p className="team-role">CEO</p>
            <p className="team-description">Shivaji is the founder and visionary behind our company.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>

          <div className="team-member">
            <div className="team-image-container"></div>
            <h3 className="team-name">Om Kumavat</h3>
            <p className="team-role">CTO</p>
            <p className="team-description">Om leads the technical department and product development.</p>
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
