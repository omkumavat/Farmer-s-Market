import React from 'react';
import '../CSS/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="contact-info">
          <div>
            <i className="fa fa-phone"></i>
            <p><a href="tel:+918767729499">+918767729499</a></p>
            <span>Contact us if you have a question</span>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p><a href="mailto:info@verdica.com">info@verdica.com</a></p>
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
        <div className="about-sections">
          <h3>VERDICA</h3>
          <p>
            We are dedicated to the production and marketing of mass consumer
            products. Its business units are the manufacture of chemicals for
            household hygiene and personal care.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="about-links">
          <h3>About</h3>
          <ul>
            <li><a href="/history">History</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/clients">Clients</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2024 VERDICA Agriculture | <a href="/about">About</a> | 
          <a href="/solutions">Solutions</a> | <a href="/projects">Projects</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
