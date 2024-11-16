// src/components/Homepage.js
import React, { useState, useEffect } from "react";
import "../CSS/home.css";
import NavBar from "../Components/NavBar";

const Home = ({ showNavs = true, autoSlide = true, slideInterval = 3000 }) => {
    const slides = [
        {
            image: "/Images/forlogin.jpg",
            text: "Good Health Conscious Living",
            button1: "About Us",
            button2: "Contact",
        },
        {
            image: "/Images/logo.jpg",
            text: "Green Agriculture Practices",
            button1: "Learn More",
            button2: "Join Us",
        },
        {
            image: "/Images/forlogin.jpg",
            text: "Empowering Farmers",
            button1: "Get Started",
            button2: "Explore",
        },
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
                                <h1>{slide.text}</h1>
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
        </>
    );
};

export default Home;
