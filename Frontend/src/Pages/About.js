
import React from 'react';
import '../CSS/aboutus.css'; // Ensure CSS is correctly linked
import NavBar from '../Components/NavBar';
import Footer from "../Components/Footer";
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
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
         <div className="contentsection">
  <div className="contentleft">
    <div className="contentimage aboutimageleft"></div>
  </div>
  <div className="contentright">
    <h3>About VERDICA</h3>
    <p>
      Cultivating Ideas for Growth <br />
      Verdica is a cutting-edge agricultural platform dedicated to empowering farmers with innovative solutions for sustainable and efficient farming. We bridge the gap between traditional practices and modern technology, providing tools, insights, and expert guidance to help farmers enhance productivity, preserve resources, and achieve long-term success.
    </p>
  </div>
</div>
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



<div className="servicessection">
  {/* <h3>Our Services</h3> */}
  <p>
    Our website offers a variety of products available for buying and selling, empowering farmers and consumers alike.
  </p>
  <div className="servicescontainer">
    <div className="serviceitem">
      <div className="icon">🥦</div>
      <h4>Vegetables</h4>
      <p>Buy and sell fresh vegetables directly from farmers.</p>
      <a href="/farmer/category/FreshProduce">
    <button>Buy Now</button>
  </a>
    </div>
    <div className="serviceitem">
      <div className="icon">🌾</div>
      <h4>Natural Wheats</h4>
      <p>Discover high-quality natural wheat available for purchase and sale.</p>
      <a href="/farmer/category/Grains and Cereals">
    <button>Buy Now</button>
  </a>
    </div>
    <div className="serviceitem">
      <div className="icon">🍎</div>
      <h4>Fresh Fruits</h4>
      <p>Access a wide range of fresh fruits grown by local farmers.</p>
      <a href="/farmer/category/Fresh Produce">
    <button>Buy Now</button>
  </a>
    </div>
    <div className="serviceitem">
      <div className="icon">🐄</div>
      <h4>Healthy Cattle</h4>
      <p>Buy and sell healthy cattle for agricultural and dairy needs.</p>
      <a href="/farmer/category/Dairy and Milk Products">
    <button>Buy Now</button>
  </a>
    </div>
    <div className="serviceitem">
      <div className="icon">🚛</div>
      <h4>Modern Truck</h4>
      <p>Explore trucks for transporting goods efficiently.</p>
      <a href="/dealer/category/Agricultural Machinery and Tools">
    <button>Buy Now</button>
  </a>
    </div>
    <div className="serviceitem">
  <div className="icon">🧴</div> 
  <h4>Pesticides</h4>
  <p>Discover high-quality pesticides available to enhance crop protection and yields.</p>
  <a href="/dealer/category/Pesticides and Herbicides">
    <button>Buy Now</button>
  </a>
</div>
  </div>
</div>
</div>
      <Footer />
    </>
  );
};

export default AboutUs;
