import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa'; // Import icons from react-icons
import '../CSS/contactus.css'; // Ensure CSS file is linked
import NavBar from '../Components/NavBar'
import Footer from "../Components/Footer";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

// import React, { useState } from "react";
// import "../CSS/ticket.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import NavBar from "../Components/NavBar";
// import Footer from "../Components/Footer";
import { useEffect } from "react";
import Loader from "../Components/Loader";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    mobileno: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    query: yup.string().required('Query is required'),
});
const ContactUs = () => {

  const [activeIndex, setActiveIndex] = useState(null);
    const { currentUser } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (currentUser !== undefined) {
            setIsAuthReady(true); // Mark as ready once currentUser is loaded
        }
    }, [currentUser]);

    useEffect(() => {
            if (errors.mobileno) {
                toast.error('Mobile number must be 10 digits');
            }
            if (errors.email) {
                toast.error('Enter a valid email');
            }
        }, [errors]); // Triggered whenever there is a form error
        
    if (!isAuthReady) {
        return <Loader />;
    }

    const onSubmit = async (data) => {
      if (!currentUser) {
          toast.error("Login First");
      } else {
          try {
              const userId = currentUser._id;
              const response = await axios.post(`https://farmer-s-market-theta.vercel.app/server/submiticket`, {
                  data,
                  userId
              });
              // // console.log(response.data);
  
              // Show success toast after successful submission
              toast.success("Your query has been submitted!");
  
              // Reset the form after submission
              reset();
          } catch (error) {
              // Show error toast if something goes wrong with the submission
              toast.error("There was an error submitting your query. Please try again.");
          }
      }
  };


  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  
  const defaultCenter = {
    lat: 18.4575, // Example latitude (New York)
    lng: 73.8508, // Example longitude (New York)
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
              <FaPhoneAlt /> <strong>Phone:</strong> +918767729499 <br />
              Contact us if you have a question.
            </p>
            <p>
              <FaEnvelope /> <strong>Email:</strong> info@AgriHaven.com <br />
              Drop us an email and we will get back to you.
            </p>
            <p>
              <FaClock /> <strong>Working Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM
            </p>
          </div>

          <div className="ticket-form-container">
                        <h2 className="form-title">Submit Your Query</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="ticket-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    {...register('name')}
                                    className="form-input"
                                />
                                {errors.name && <p className="error">{errors.name.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    {...register('email')}
                                    className="form-input"
                                />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobileNo">Mobile Number</label>
                                <input
                                    type="text"
                                    id="mobileno"
                                    placeholder="Enter your mobile number"
                                    {...register('mobileno')}
                                    className="form-input"
                                />
                                {errors.mobileNo && <p className="error">{errors.mobileNo.message}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="query">Query</label>
                                <textarea
                                    id="query"
                                    placeholder="Enter your query here"
                                    {...register('query')}
                                    className="form-textarea"
                                />
                                {errors.query && <p className="error">{errors.query.message}</p>}
                            </div>

                            <button type="submit" className="submit-button">
                                Submit Ticket
                            </button>

                            {/* {submitted && <p className="success-message">Your query has been submitted!</p>} */}
                        </form>
                    </div>
            </div>

        {/* Google Map */}
<div className="map-container">
  <h3>Our Office Location</h3>
  {/* Embedded Google Map using iframe */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1137.2718012345345!2d73.84819918702547!3d18.459061138998926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac9e41c7edf%3A0x934e2c88eccb2cc!2sRadheshyam%20Boys%20Hostel!5e0!3m2!1sen!2sin!4v1746254308715!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
      </div>
      <Footer />
       <ToastContainer /> 
    </>
  );
};

export default ContactUs;
