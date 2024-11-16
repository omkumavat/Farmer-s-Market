import React from 'react';
import '../CSS/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="contact-info">
          <div>
            <i className="fa fa-phone"></i>
            <p>+053 123-456-7890</p>
            <span>Contact us if you have a question</span>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p>info@agros.com</p>
            <span>Drop us an email</span>
          </div>
          <div>
            <i className="fa fa-clock"></i>
            <p>Monday to Friday</p>
            <span>We are open from 9:00 PM to 6:00 PM</span>
          </div>
        </div>
      </div>
      <div className="footer-middle">
        <div className="about-section">
          <h3>Agros</h3>
          <p>
            We are dedicated to the production and marketing of mass consumer
            products. Its business units are the manufacture of chemicals for
            household hygiene and personal care.
          </p>
          <div className="social-icons">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
          </div>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>Blogs</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="about-links">
          <h3>About</h3>
          <ul>
            <li>History</li>
            <li>Team</li>
            <li>Clients</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="recent-news">
          <h3>Recent News</h3>
          <ul>
            <li>
              <span>Improvements in Agro Techniques</span>
              <small>24 July 2020</small>
            </li>
            <li>
              <span>The Roth strategy we wish retirement</span>
              <small>22 July 2020</small>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2020 Agros Agriculture & Organic Food HTML Template | About |
          Solutions | Projects
        </p>
      </div>
    </footer>
  );
};

export default Footer;
