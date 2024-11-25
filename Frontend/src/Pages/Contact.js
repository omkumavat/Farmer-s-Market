import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa'; // Import icons from react-icons
import '../CSS/contactus.css'; // Ensure CSS file is linked
import NavBar from '../Components/NavBar'
import Footer from "../Components/Footer";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const ContactUs = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  
  const defaultCenter = {
    lat: 18.4575, // Example latitude (New York)
    lng: 73.8508, // Example longitude (New York)
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('All fields are required.');
      return;
    }

    // Here, you can send the form data to a server via an API request
    setSuccess('Your message has been sent successfully!');
    setError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <><NavBar />
      <div className="contact-us-container">
        {/* Contact Us Header Image with Text */}
        <div className="contact-us-header">
          <h2>Contact Us</h2>
          <p>GET IN TOUCH</p>
        </div>

        {/* Main Content: Contact Details and Form */}
        <div className="contact-us-content">
          {/* Contact Details Section (Left Side) */}
          <div className="contact-us-details">
            <h3>GET IN TOUCH WITH US</h3>
            <p>
              World’s leading non-asset-based supply chain management companies, we design and implement industry-leading solutions. We specialize in intelligent logistics.
            </p>
            <p>
              <FaPhoneAlt /> <strong>Phone:</strong> +456 127-566-7980 <br />
              Contact us if you have a question.
            </p>
            <p>
              <FaEnvelope /> <strong>Email:</strong> Agro.com <br />
              Drop us an email and we will get back to you.
            </p>
            <p>
              <FaClock /> <strong>Working Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM
            </p>
          </div>

          {/* Contact Form Section (Right Side) */}
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <label htmlFor="name">*Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">*Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">*Please Enter Your Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">*Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="map-container">
          <h3>Our Office Location</h3>
          {/* Embed Google Map */}
            <LoadScript googleMapsApiKey={"AIzaSyD0w1lvfJkEcNqp-3gJ-9s8GSLr8GrhzoQ"}>
            <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13} />
            </LoadScript>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
