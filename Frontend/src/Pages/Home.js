// src/components/Homepage.js
import React, { useState, useEffect } from "react";
import "../CSS/home.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Home = ({ showNavs = true, autoSlide = true, slideInterval = 5000 }) => {
    const slides = [
        {
            image: "/Images/slider1.jpeg",
            text: "Good Health Conscious Living",
            button1: "About Us",
            button2: "Contact",
        },
        {
            image: "/Images/slider2.jpeg",
            text: "Green Agriculture Practices",
            button1: "Learn More",
            button2: "Join Us",
        },
        {
            image: "/Images/slider3.jpeg",
            text: "Empowering Farmers",
            button1: "Get Started",
            button2: "Explore",
        },
        {
            image: "/Images/slider4.jpeg",
            text: "Empowering Farmers",
            button1: "Get Started",
            button2: "Explore",
        },
        {
            image: "/Images/slider5.jpeg",
            text: "Empowering Farmers",
            button1: "Get Started",
            button2: "Explore",
        }
    ];

    const cards = [
        {
            icon: "🛠️",
            title: "Industry Oriented",
            description: "Enabling ecosystem for food agriculture.",
        },
        {
            icon: "🚜",
            title: "Modern Truck",
            description: "The mission of Agroly is to facilitate.",
        },
        {
            icon: "🌱",
            title: "Farm Plans",
            description: "Latest analysis by the Cadre Harmonisé.",
        },
        {
            icon: "✔️",
            title: "Service Guarantee",
            description: "The Food and Agriculture Organization.",
        },
    ];

    const projects = [
        { id: 1, title: "Project 1", image: "/Images/agri1.jpeg" },
        { id: 2, title: "Project 2", image: "/Images/agri1.jpeg" },
        { id: 3, title: "Project 3", image: "/Images/agri1.jpeg" },
        { id: 4, title: "Project 4", image: "/Images/agri1.jpeg" },
        { id: 5, title: "Project 5", image: "/Images/agri1.jpeg" },
        { id: 6, title: "Project 6", image: "/Images/agri1.jpeg" },
    ];

    const cards2 = [
        { icon: "🌱", title: "Vegetables", text: "Homes and thoroughly launder them between usage. We give our teams." },
        { icon: "🍍", title: "Fresh Fruits", text: "We are closely monitoring national, state and local health developments." },
        { icon: "🐄", title: "Healthy Cattle", text: "Follow these tips from the CDC to help prevent the spread of the seasonal." },
        { icon: "🌾", title: "Natural Wheats", text: "Industra plays a large role in the comfort of your home, but many." },
        { icon: "🚜", title: "Modern Truck", text: "We realize that every family has their own preferences, so we accommodate." },
        { icon: "🌅", title: "Farm Plans", text: "While some cleaning companies use rotating cleaning plans, we’re equipped." },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (autoSlide) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            }, slideInterval); // Slide interval (e.g., 3 seconds)
            return () => clearInterval(interval);
        }
    }, [slides.length, autoSlide, slideInterval]);

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <>
            <NavBar />
            <div className="homepage">
                <div className="homepage-slider">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? "active" : ""}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="slide-content">
                                <h1 className="texti">{slide.text}</h1>
                                <div className="buttons">
                                    <button className="btn-primary">{slide.button1}</button>
                                    <button className="btn-secondary">{slide.button2}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Show navigation buttons if showNavs is true */}
                    {showNavs && (
                        <>
                            <button className="nav-btn prev-btn" onClick={goToPrevSlide}>
                                &#8592;
                            </button>
                            <button className="nav-btn next-btn" onClick={goToNextSlide}>
                                &#8594;
                            </button>
                        </>
                    )}
                </div>
                <div>

                </div>
                <div className="card-section">
                    {cards.map((card, index) => (
                        <div key={index} className="card">
                            <div className="card-icon">{card.icon}</div>
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-description">{card.description}</p>
                        </div>
                    ))}
                </div>
                <div className="about-section">
                    {/* Left Side: Image */}
                    <div className="about-image">
                        <img
                            src="/Images/logo.jpg" // Replace with your image URL
                            alt="Agriculture Growth"
                        />
                    </div>

                    {/* Right Side: Content */}
                    <div className="about-content">
                        <h3 className="subheading">About Verdica</h3>
                        <h1 className="heading">Bringing Growth To Agriculture</h1>
                        <p className="description">
                            Our goal at Agri Shop is to improve farmers' quality of life by giving them the resources, knowledge, and market access they require to succeed.
                        </p>
                        <p className="description">
                            We provide smallholder farmers with individualized guidance and tactics, utilizing data-driven insights and contemporary farming methods to enable more informed decision-making. By integrating scalable solutions with precision agriculture, we assist farmers in increasing their output and financial success.
                        </p>

                        {/* Features */}
                        <div className="features">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div>
                                    <h4>Service Guarantee</h4>
                                    <p>
                                        Our services ensure the best quality for smallholder farmers, dealers and shopkeepers to help them grow sustainably.
                                    </p>
                                </div>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-leaf"></i>
                                </div>
                                <div>
                                    <h4>Market Research</h4>
                                    <p>
                                        We research the best market opportunities for smallholder farmers in emerging economies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-container">
                    <div className="image-section">
                        <img src="/Images/logo.jpg" alt="Image" />
                    </div>
                    <div className="content-section">
                        <div className="content-sec">
                            <h1 className="header1">WHY CHOOSE US</h1>
                            <h2 className="header2">We Providing More Fresh Products</h2>
                            <p className="header3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="content-sec2">
                            <div className="icon-container">
                                <img src="/Images/section1.png" className="trans-image" alt="Icon 1" />
                                <p>Fresh & Healthy</p>
                            </div>
                            <div className="icon-container">
                                <img src="/Images/section2.png" className="trans-image" alt="Icon 2" />
                                <p>Quality & Support</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card-layout">
                    <div className="card-container">
                        {cards2.map((card, index) => (
                            <div key={index} className="card">
                                <span className="card-icon">{card.icon}</span>
                                <h3 className="card-title">{card.title}</h3>
                                <p className="card-text">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pr-text">
                    <h2 className="section-title">Latest Projects</h2>
                    <p className="section-subtitle">
                        We have a wide range of projects in all areas of agriculture.
                    </p>
                </div>
                <div className="projects-section">
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div className="project-card" key={project.id}>
                                <img src={project.image} alt={project.title} className="project-image" />
                                <div className="overlay">
                                    <h3 className="project-title">{project.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default Home;
