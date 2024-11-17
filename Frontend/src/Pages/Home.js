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
            </div>
            <Footer/>
        </>
    );
};

export default Home;
