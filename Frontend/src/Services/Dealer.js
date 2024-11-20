import { useState, useEffect } from "react";
import DealerPCard from "../Components/DealerPCard";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../ServicesCSS/dealer.css";
import axios from "axios";

const Dealer = () => {
  const [displayProducts, setDisplayProducts] = useState([]);

  // Function to fetch limited products (6 in this case)
  const fetchLimitedProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/dealer/getallproducts/all?limit=6");
      if (!response) {
        throw new Error("Failed to fetch products");
      }
      const data =  response.data; 

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
    { name: "Offers", img: "/Images/dealer11.jpg", url: "/dealer/category/offers" },
    { name: "Seeds", img: "/Images/dealer12.jpg", url: "/dealer/category/seeds" },
    { name: "Fertilizers", img: "/Images/dealer13.jpg", url: "/dealer/category/fertilizers" },
    { name: "Pesticides", img: "/Images/dealer14.png", url: "/dealer/category/pesticides" },
    { name: "Machinery", img: "/Images/dealer15.jpg", url: "/dealer/category/machinery" },
    { name: "Livestock", img: "/Images/dealer16.jpg", url: "/dealer/category/livestocks" },
    { name: "Farm Equipment", img: "/Images/dealer17.jpg", url: "/dealer/category/farm-equipment" },
    { name: "Farm Infrastructure", img: "/Images/dealer18.jpg", url: "/dealer/category/farm-infrastructure" },
    { name: "Irrigation Equipment", img: "/Images/dealer19.jpg", url: "/dealer/category/irrigatin-equipment" },
    { name: "Organic Farming", img: "/Images/dealer20.jpg", url: "/dealer/category/orgainc-farming" },
    { name: "Animal Husbandry", img: "/Images/dealer21.jpg", url: "/dealer/category/animal-husbandry" },
    { name: "New Products", img: "/Images/dealer22.jpg", url: "/dealer/category/new-products" },
  ];

  const brandLogos = [
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
    "/Images/dealer11.jpg",
  ];

  const services = [
    {
      icon: "🧑‍🌾",
      title: "Fertilizers",
      description: "Homes and thoroughly launder them between usage. We give our teams.",
    },
    {
      icon: "🍎",
      title: "Seeds",
      description: "We are closely monitoring national, state and local health developments.",
    },
    {
      icon: "🐄",
      title: "Agricultural Machinery and Tools",
      description: "Follow these tips from the CDC to help prevent the spread of the seasonal.",
    },
    {
      icon: "🌾",
      title: "Post-Harvest Equipment",
      description: "Industra plays a large role in the comfort of your home, but many.",
    },
    {
      icon: "🚜",
      title: "Farm Infrastructure",
      description: "We realize that every family has their own preferences, so we accommodate.",
    },
    {
      icon: "📋",
      title: "Irrigation Equipment",
      description: "While some cleaning companies use rotating cleaning plans, we’re equipped.",
    },
  ];

  return (
    <>
      <NavBar />
      <div>
        <div className="mc">
          <div className="cs">
            <h2 className="head1">Our Services</h2>
            <p className="head2">PROVIDE BY VERDICA</p>
          </div>
        </div>
        <div className="services-container">
          <div className="serv">
            <h2 className="services-title">Agricultural Products</h2>
            <p className="services-subtitle">
              Industra is a global community of practice that facilitates dialogue,
              information exchange and use of information.
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
              For a Thriving Agricultural Community
              <br /> <span>Tomorrow</span>
            </h1>
            <p className="description">
              At Verdica, we are committed to building bridges between dealers and farmers, enabling seamless access to essential agricultural products and services. Our platform empowers dealers to showcase their offerings while ensuring quality and trust for farmers.
            </p>
            <p className="description">
              With a focus on innovation and sustainability, Verdica provides verified dealers with a comprehensive platform to list, manage, and sell their products, from seeds and tools to advanced farming equipment. Together, we aim to create a thriving agricultural marketplace that benefits all stakeholders.
            </p>
            <p className="description">
              Verdica is your trusted partner, connecting dealers with farmers to achieve mutual success while promoting sustainable agricultural practices.
            </p>
          </div>

          {/* Image Section */}
          <div className="image-container">
            <img
              src="/Images/slider1.jpeg"
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
                <a href={category.url}>
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
          {/* Popular Products */}
          {displayProducts.map((product, index) => (
            <DealerPCard key={index} {...product} />
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
};

export default Dealer;
