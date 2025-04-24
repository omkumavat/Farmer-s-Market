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
            <p><a href="mailto:info@AgriHaven.com">info@agrihaven.com</a></p>
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
          <h3>AgriHaven</h3>
          <p>
          "At AgriHaven, we understand the challenges farmers face. Our platform offers personalized weather forecasts, crop suggestions based on climate conditions, and expert advice to help farmers make informed decisions. Join us in revolutionizing agriculture for a better tomorrow."
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
            <li><a href="/farmer">Services</a></li>
            <li><a href="/land-preservation">Solutions</a></li>
            <li><a href="/market">Market Insight</a></li>
          </ul>
        </div>
        <div className="about-links">
          <h3>About</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/ticket">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2024 AgriHaven Agriculture | <a href="/about">About</a> | 
          <a href="/land-preservation">Solutions</a> | <a href="/contact">Contact</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
