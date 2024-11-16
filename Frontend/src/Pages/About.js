
import React from 'react';
import '../CSS/aboutus.css'; // Ensure CSS is correctly linked
import NavBar from '../Components/NavBar';
import Footer from "../Components/Footer";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-us-container">
        {/* Header Section */}
        <div className="about-us-header">
          <div className="header-image"></div>
          <div className="header-text">
            <h1>About Us</h1>
            <h2>About Agrosin</h2>
          </div>
        </div>

        {/* First Content Section */}
        <div className="content-section">
          <div className="content-left">
            <div className="content-image about-image-left"></div>
          </div>
          <div className="content-right">
            <h3>About Agrosin</h3>
            <p>
              Cultivating Ideas for Growth <br />
              We offer reasonable pricing health care plans, insurance packages
              to clients. Helping farmers to emerging markets maximize their
              profits. We use agronomic machine learning, remote sensing, and
              mobile phones to deliver financing, farm products. Has 26 affiliated
              state soybean associations representing 30 soybean-producing states.
            </p>
            <div className="stats">
              <p>
                <strong>478</strong> <span>Happy Customers</span>
              </p>
              <p>
                <strong>1200</strong> <span>Total Projects</span>
              </p>
            </div>
          </div>
        </div>
         
        {/* Second Content Section */}
        <div className="content-section reverse">
          <div className="content-left">
            <div className="content-image about-image-right"></div>
          </div>
          <div className="content-right">
            <h3>WHY CHOOSE US?</h3>
            <p>
              A Bright Nature of Decision <br />
              We serve with best superiority and service. Your toolkit for
              business originality brings cheers to put your solid hat on.
            </p>
            <p>
              Before agriculture became widespread, people spent most of their
              lives searching for food—hunting wild animals and gathering wild
              plants. About 11,500 years ago, people gradually learned how to grow
              cereal and root crops and settled down to a life based on farming.
            </p>
            <ul>
              <li><strong>Natural Care:</strong> First domesticated</li>
              <li><strong>Expert Team:</strong> Began growing crops</li>
            </ul>
          </div>
        </div>


        <div className="team-section">
  <h3>Meet Our Team</h3>
  <p>We will be the leading company in the national market with each of our products Caribbean.</p>
  <div className="team-members">
    <div className="team-member member-left">
      <div className="contact-icons">
        <i className="icon fab fa-facebook"></i>
        <i className="icon fab fa-twitter"></i>
        <i className="icon fab fa-instagram"></i>
      </div>
      <div className="name">John Doe</div>
    </div>
    <div className="team-member member-middle">
      <div className="contact-icons">
        <i className="icon fab fa-facebook"></i>
        <i className="icon fab fa-twitter"></i>
        <i className="icon fab fa-instagram"></i>
      </div>
      <div className="name">Jane Smith</div>
    </div>
    <div className="team-member member-right">
      <div className="contact-icons">
        <i className="icon fab fa-facebook"></i>
        <i className="icon fab fa-twitter"></i>
        <i className="icon fab fa-instagram"></i>
      </div>
      <div className="name">Mark Lee</div>
    </div>
  </div>
</div>


        {/* Our Services Section */}
        <div className="services-section">
          <h3>Our Services</h3>
          <p>
            Industra is a global community of practice that facilitates dialogue, information exchange, and use of information.
          </p>
          <div className="services-container">
            <div className="service-item">
              <div className="icon">🥦</div>
              <h4>Vegetables</h4>
              <p>Accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
              <button>Learn More</button>
            </div>
            <div className="service-item">
              <div className="icon">🌾</div>
              <h4>Natural Wheats</h4>
              <p>We are closely monitoring national, state, and local health agencies.</p>
              <button>Learn More</button>
            </div>
            <div className="service-item">
              <div className="icon">🍎</div>
              <h4>Fresh Fruits</h4>
              <p>Follow these tips from the CDC to help prevent the spread of the seasonal.</p>
              <button>Learn More</button>
            </div>
            <div className="service-item">
              <div className="icon">🐄</div>
              <h4>Healthy Cattle</h4>
              <p>Industra plays a large role in the comfort of your home, but many.</p>
              <button>Learn More</button>
            </div>
            <div className="service-item">
              <div className="icon">🚛</div>
              <h4>Modern Truck</h4>
              <p>We realize that every family has their own preferences, so we accommodate.</p>
              <button>Learn More</button>
            </div>
            <div className="service-item">
              <div className="icon">💼</div>
              <h4>Professional Consultation</h4>
              <p>Our consultants ensure your company's needs are met with the best products.</p>
              <button>Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
