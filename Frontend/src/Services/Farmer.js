import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import '../ServicesCSS/dealer.css'
import FarmerProduct from "../Components/FarmerProduct";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
const Farmer = () => {
    const [displayProducts, setDisplayProducts] = useState([]);
    const fetchLimitedProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/server/farmer/getallproducts/all?limit=6");
            if (!response) {
                throw new Error("Failed to fetch products");
            }
            const data = response.data;

            console.log(response.data.data);
            setDisplayProducts(response.data.data);
            console.log(displayProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // UseEffect to fetch the products when the component mounts
    useEffect(() => {
        fetchLimitedProducts(); // Only call this once on component mount
    }, []); // Empty dependency array to ensure it runs once on mount


    const categories = [
        { name: "Offers", img: "/Images/dealer11.jpg", url: "/farmer/category/offers" },
        { name: "Fresh Produce", img: "/Images/farmer1.jpg", url: "Fresh Produce" },
        { name: "Grains and Cereals", img: "/Images/farmer2.jpg", url: "Grains and Cereals" },
        { name: "Pulses and Legumes", img: "/Images/farmer3.jpg", url: "Pulses and Legumes" },
        { name: "Dairy and Milk Products", img: "/Images/farmer4.jpg", url: "Dairy and Milk Products" },
        { name: "Livestock and Animal Products", img: "/Images/farmer5.jpg", url: "Livestock and Animal Products" },
        { name: "Organic Products", img: "/Images/farmer6.jpg", url: "Organic Products" },
        { name: "Value-Added Products", img: "/Images/farmer7.jpg", url: "Value-Added Products" },
        { name: "Specialty Crops", img: "/Images/farmer8.jpg", url: "Specialty Crops" },
        { name: "Fibers and Raw Materials", img: "/Images/farmer9.jpg", url: "Fibers and Raw Materials" },
        { name: "Flowers & Plants", img: "/Images/farmer10.jpg", url: "Flowers & Plants" },
        { name: "By-products", img: "/Images/farmer11.jpg", url: "By-products" },
    ];


    const brandLogos = [
        "/Images/dealer11.jpg",
        "/Images/dealer11.jpg",
        "/Images/dealer11.jpg",
        "/Images/dealer11.jpg",
        "/Images/dealer11.jpg",
        "/Images/dealer11.jpg",
        "/Images/dealer11.jpg",
        "/Images/dealer11.jpg"
    ];



    const services = [
        {
            icon: "🌾", // Replace with your SVG or image
            title: "Crop Production",
            description: "Farmers provide high-quality crops, from grains to vegetables, grown with care and expertise.",
        },
        {
            icon: "🐄", // Replace with your SVG or image
            title: "Animal Husbandry",
            description: "Farmers raise livestock for meat, milk, and other by-products, ensuring quality and sustainability.",
        },
        {
            icon: "🌱", // Replace with your SVG or image
            title: "Organic Farming",
            description: "Farmers offer organic produce, grown without harmful chemicals, ensuring a healthier option for consumers.",
        },
        {
            icon: "🚜", // Replace with your SVG or image
            title: "Land Preparation",
            description: "Farmers provide land preparation services such as tilling, plowing, and soil fertilization for crop planting.",
        },
        {
            icon: "🌻", // Replace with your SVG or image
            title: "Flower Farming",
            description: "Farmers grow flowers for sale to nurseries, markets, or for decoration in events and homes.",
        },
        {
            icon: "🍯", // Replace with your SVG or image
            title: "Honey Production",
            description: "Farmers harvest honey from beehives, offering fresh, natural honey directly from the farm.",
        },
    ];


    return (
        <><NavBar />
            <div>
                <div className="mc">
                    <div className="cs">
                        <h2 className="head1">Our Services</h2>
                        <p className="head2">PROVIDE BY VERDICA</p>
                    </div>
                </div>
                <div className="services-container">
                    <div className="serv">
                        <h2 className="services-title">Farm Produce</h2>
                        <p className="services-subtitle">
                            Verdica empowers farmers to connect and sell their produce directly, ensuring fair prices through a global community-driven platform.
                        </p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div className="service-card" key={index}>
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <a href="#" className="service-link">
                                    Learn More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container">
                    {/* Top Section */}
                    <div className="content">
                        <p className="sub-heading">AT VERDICA</p>
                        <h1 className="main-heading">
                            For a Thriving Agricultural Community<br /> <span>Tomorrow</span>
                        </h1>
                        <p className="description">
                            Verdica provides a platform where farmers can offer essential services like land preparation, crop cultivation, and organic farming to others in the agricultural community. This enables farmers to showcase their skills and expertise.
                        </p>
                        <p className="description">
                            Farmers can list, manage, and sell their services, helping them reach a broader audience. Verdica makes it easier for farmers to connect with those who need their services, ensuring mutual growth.
                        </p>
                        <p className="description">Verdica is dedicated to creating a trusted environment where farmers can succeed by offering their valuable services. We aim to build a vibrant community that drives success and mutual benefit.</p>
                    </div>

                    {/* Image Section */}
                    <div className="image-container">
                        <img
                            src="/Images/slider1.jpeg" // Placeholder image URL
                            alt="Sustainable Agriculture"
                            className="farming-image"
                        />
                    </div>
                </div>
                <div className="categories-container">
                    <h2 className="categories-heading">Categories</h2>
                    <div className="styleline"></div>
                    <div className="categories-grid">
                        {categories.map((category, index) => (

                            <div key={index} className="category-item">
                                 <a href={`/farmer/category/${category.url}`}>
                                    <div className="category-image">
                                        <img src={category.img} alt={category.name} />
                                    </div>
                                </a>
                                <p className="category-name">{category.name}</p>
                            </div>

                        ))}
                    </div>
                </div>
                <div className="appsd">
                    <h1>Popular Products</h1>
                    {displayProducts.map((product, index) => (
                        <div>
                            <FarmerProduct key={index} {...product} />
                        </div>
                    ))}
                </div>
                <div className="brandc">
                    <div className="brands">
                        <div className="sliderb">
                            {brandLogos.map((logo, index) => (
                                <div className="imgg" key={index}>
                                    <img src={logo} alt={`Brand ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Farmer;