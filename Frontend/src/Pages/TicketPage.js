import React, { useState, useEffect } from "react";
import "../CSS/ticket.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    mobileno: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    query: yup.string().required('Query is required'),
});

const questions = [
    { question: "How can I contact you?", answer: "You can contact us via our helpline or email support provided on the website." },
    { question: "What is your payment method?", answer: "We accept credit cards, debit cards, and online payment options." },
    { question: "What are gas solutions?", answer: "We provide clean energy solutions for farmers, including biogas plants and solar-powered equipment." },
    { question: "Do you offer organic products?", answer: "Yes, all our products are certified organic and pesticide-free." },
    { question: "How do I sell my produce?", answer: "Register as a farmer on our website and list your produce for sale." },
    { question: "Do you deliver farm tools?", answer: "Yes, we deliver farm tools and machinery to your doorstep." },
    { question: "What are the benefits of registering?", answer: "Farmers get access to better pricing, tools, and market insights." },
    { question: "Can I track my orders?", answer: "Yes, order tracking is available under your account dashboard." },
    { question: "Do you provide training for farmers?", answer: "We provide workshops and online tutorials for modern farming techniques." },
    { question: "Are discounts available?", answer: "We offer seasonal discounts and bulk purchase deals for farmers." },
];

const TicketPage = () => {
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

    // Effect for showing toast when validation errors occur
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

    // const onSubmit = async (data) => {
    //     if (!currentUser) {
    //         console.log(currentUser);
    //         toast.error("Login First"); 
    //     }
    //     else {
    //         const userId = currentUser._id;
    //         const response = await axios.post(`https://farmer-s-market-theta.vercel.app/server/submiticket`, {
    //             data,
    //             userId
    //         });
    //         console.log(response.data);
    //         setSubmitted(true);

    //         // Reset the form after submission
    //         reset();

    //         // Optional: Hide success message after 3 seconds
    //         setTimeout(() => {
    //             setSubmitted(false);
    //         }, 3000);
    //     }
    // };
   
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
                console.log(response.data);
    
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
    
    

    return (
        <>
            <NavBar />
            <div>
                <div>
                    <div className="team-header">
                        <h2>FAQ</h2>
                        <p>FREQUENTLY ASKED QUESTIONS</p>
                    </div>
                    <div className="container">
                        {/* Top Section */}
                        <div className="content">
                            <p className="sub-heading">AT VERDICA</p>
                            <h1 className="main-heading">
                                Empowering Users with Easy Access to Help
                                <br />
                            </h1>
                            <p className="description">
                                We strive to maintain transparency and efficiency in every interaction. By submitting a ticket, you allow us to understand your needs better, and we will work on resolving them as quickly as possible.
                            </p>
                            <p className="description">
                                If you have a specific question or issue that isn't covered in our FAQs, feel free to submit a query below. Our team is ready to help you with any inquiries.
                            </p>
                            <p className="description">
                                We believe in providing excellent customer service to help you resolve any issues. Feel free to reach out if you have any questions or concerns.
                            </p>
                        </div>
                    </div>

                    <div className="categories-container">
                        <h2 className="categories-heading">FAQs (Frequently Asked Questions)</h2>
                        <div className="styleline"></div>
                    </div>
                </div>
                <div className="accordion">
                    {questions.map((item, index) => (
                        <div key={index} className="accordion-item">
                            <div
                                className={`accordion-header ${activeIndex === index ? "active" : ""}`}
                                onClick={() => toggleQuestion(index)}
                            >
                                <h3>{item.question}</h3>
                                <span>{activeIndex === index ? "−" : "+"}</span>
                            </div>
                            <div
                                className={`accordion-body ${activeIndex === index ? "open" : ""}`}
                            >
                                {activeIndex === index && <p>{item.answer}</p>}
                            </div>
                        </div>
                    ))}
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
                     
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer /> {/* Add ToastContainer to render toasts */}
        </>
    );
};

export default TicketPage;
