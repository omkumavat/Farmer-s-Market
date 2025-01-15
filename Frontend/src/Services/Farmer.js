import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import '../ServicesCSS/dealer.css'
import FarmerProduct from "../Components/FarmerProduct";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import {SearchBar1} from '../Components/SearchBar'
const Farmer = () => {
    const [displayProducts, setDisplayProducts] = useState([]);
    const fetchLimitedProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/server/farmer/getallproducts/all?limit=5");
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
            description: "Crop production involves cultivating plants for food, fiber, and other resources. It includes activities like soil preparation, planting, irrigation, pest control, and harvesting to ensure healthy and high-yield crops.",
        },
        {
            icon: "🐄", // Replace with your SVG or image
            title: "Animal Husbandry",
            description: "Animal husbandry involves breeding, raising, and managing livestock like cattle, sheep, and poultry. It supports food production, raw materials, and agricultural sustainability.",
        },
        {
            icon: "🌱", // Replace with your SVG or image
            title: "Organic Farming",
            description: "Organic farming is an agricultural method that avoids synthetic chemicals, fertilizers, and genetically modified organisms (GMOs).",
        },
        {
            icon: "🚜", // Replace with your SVG or image
            title: "Land Preparation",
            description: "Farmers provide land preparation services such as tilling, plowing, and soil fertilization for crop planting.",
        },
        {
            icon: "🌻", // Replace with your SVG or image
            title: "Flower Farming",
            description: "Land preparation involves tasks like clearing, tilling, and leveling the soil to create optimal conditions for planting crops.",
        },
        {
            icon: "🍯", // Replace with your SVG or image
            title: "Honey Production",
            description: "Honey production is the process where bees collect nectar from flowers and convert it into honey through enzymatic activity.",
        },
    ];


    return (
        <><NavBar />
            <div>
                <div className="mc">
                    <div className="cs">
                        <h2 className="head1">Farmer Product</h2>
                        <p className="head2">PROVIDE BY VERDICA</p>
                    </div>
                </div>
                <div className="mbar">
        <SearchBar1/>
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
                <div className="pp">
                    <h2>Popular Products</h2>
                </div>
                <div className="stylelines"></div>
                <div className="appsd">
                    {displayProducts.map((product, index) => (
                        <div>
                            <FarmerProduct key={index} {...product} />
                        </div>
                    ))}
                </div>
                {/* <div className="ppp">
        <h2>Popular Brands</h2>
        </div>
        <div className="stylelines"></div>
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
        </div> */}
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
                                <h3 className="servicetitle">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
               
    {/* Top Section */}
    <div className="content-market">
        <p className="sub-heading-market">AT VERDICA</p>
        <h1 className="main-heading-market">
          Empowering Farmers and Buyers<br /> <span>For a Better Tomorrow</span>
        </h1>
        <div className="descc-market">
            <p className="description-market">
            Verdica provides a seamless platform for farmers to sell their produce directly to buyers, fostering fair trade and eliminating middlemen. This ensures farmers get the best value for their efforts while buyers access fresh, quality products.
            </p>
            <p className="description-market">
            With Verdica, farmers can list their products, connect with a wide range of buyers, and gain insights into market demands. Buyers can explore a variety of fresh produce and negotiate directly with farmers for bulk purchases or tailored orders.
            </p>
            <p className="description-market">
            Our platform is committed to building a sustainable and efficient agricultural marketplace, where trust and transparency pave the way for mutual growth and success.
            </p>
        </div>
    </div>

    {/* Image Section */}
    <div className="image-container-market">
        <img
            src="/Images/marketinsight.jpeg" // Placeholder image URL
            alt="Farmers Market"
            className="farming-image-market"
        />
    </div>
</div>

            <Footer />
        </>
    );
}

export default Farmer;