
import React from 'react';
import '../CSS/aboutus.css'; // Ensure CSS is correctly linked
import NavBar from '../Components/NavBar';
import Footer from "../Components/Footer";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="aboutuscontainer">
        {/* Header Section */}
        <div className="aboutusheader">
          <div className="headerimage"></div>
          <div className="headertext">
            <h1>About Us</h1>
            <h2>About VERDICA</h2>
          </div>
        </div>

        {/* First Content Section */}
        <div className="contentsection">
          <div className="contentleft">
            <div className="contentimage about-image-left"></div>
          </div>
          <div className="contentright">
            <h3>About VERDICA</h3>
            <p>
              Cultivating Ideas for Growth <br />
              Verdica is a cutting-edge agricultural platform dedicated to empowering farmers with innovative solutions for sustainable and efficient farming. We bridge the gap between traditional practices and modern technology, providing tools, insights, and expert guidance to help farmers enhance productivity, preserve resources, and achieve long-term success.
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
        <div className="contentsection reverse">
          <div className="contentleft">
            <div className="contentimage aboutimageright"></div>
          </div>
          <div className="contentright">
            <h3>WHY CHOOSE US?</h3>
            <p>
              A Bright Nature of Decision <br />
              Verdica offers personalized farm plans, soil analysis, and land preservation strategies based on real-time data and expert insights, ensuring optimized productivity and sustainable farming practices.
            </p>
            <p>
            With access to advanced tools, cutting-edge technology, and ongoing support from agricultural professionals, Verdica helps you make informed decisions that improve efficiency, reduce costs, and promote long-term success.
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
  </div>
</div>


        {/* Our Services Section */}
        <div className="servicessection">
          <h3>Our Services</h3>
          <p>
            Industra is a global community of practice that facilitates dialogue, information exchange, and use of information.
          </p>
          <div className="servicescontainer">
            <div className="serviceitem">
              <div className="icon">🥦</div>
              <h4>Vegetables</h4>
              <p>Accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
              <button>Learn More</button>
            </div>
            <div className="serviceitem">
              <div className="icon">🌾</div>
              <h4>Natural Wheats</h4>
              <p>We are closely monitoring national, state, and local health agencies.</p>
              <button>Learn More</button>
            </div>
            <div className="serviceitem">
              <div className="icon">🍎</div>
              <h4>Fresh Fruits</h4>
              <p>Follow these tips from the CDC to help prevent the spread of the seasonal.</p>
              <button>Learn More</button>
            </div>
            <div className="serviceitem">
              <div className="icon">🐄</div>
              <h4>Healthy Cattle</h4>
              <p>Industra plays a large role in the comfort of your home, but many.</p>
              <button>Learn More</button>
            </div>
            <div className="serviceitem">
              <div className="icon">🚛</div>
              <h4>Modern Truck</h4>
              <p>We realize that every family has their own preferences, so we accommodate.</p>
              <button>Learn More</button>
            </div>
            <div className="serviceitem">
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
