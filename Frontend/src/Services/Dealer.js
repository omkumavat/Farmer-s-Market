import { useState, useEffect } from "react";
import DealerPCard from "../Components/DealerPCard";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../ServicesCSS/dealer.css";
import axios from "axios";
import Loader from "../Components/Loader";

const Dealer = () => {
  const [displayProducts, setDisplayProducts] = useState([]);

  const fetchLimitedProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/dealer/getallproducts");
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
    { name: "Offers", img: "/Images/dealer11.jpg", url: "offers" },
    { name: "Seeds", img: "/Images/dealer12.jpg", url: "Seeds" },
    { name: "Fertilizers", img: "/Images/dealer13.jpg", url: "Fertilizers" },
    { name: "Pesticides", img: "/Images/dealer14.png", url: "Pesticides and Herbicides" },
    { name: "Machinery", img: "/Images/dealer15.jpg", url: "Agricultural Machinery and Tools" },
    { name: "Livestock", img: "/Images/dealer16.jpg", url: "Livestock and Animal Farming Products" },
    { name: "Farm Equipment", img: "/Images/dealer17.jpg", url: "Post-Harvest Equipment" },
    { name: "Farm Infrastructure", img: "/Images/dealer18.jpg", url: "Farm Infrastructure" },
    { name: "Irrigation Equipment", img: "/Images/dealer19.jpg", url: "Irrigation Equipment" },
    { name: "Organic Farming", img: "/Images/dealer20.jpg", url: "Organic Farming Supplies" },
    { name: "Animal Husbandry", img: "/Images/dealer21.jpg", url: "Dairy and Allied Products" },
    { name: "New Products", img: "/Images/dealer22.jpg", url: "Miscellaneous Products" },
  ];

  const brandLogos = [
    "/Images/b1.png",
    "/Images/b2.jpg",
    "/Images/b3.png",
    "/Images/b4.png",
    "/Images/b5.jpg",
    "/Images/b6.jpg",
    "/Images/b7.jpg",
    "/Images/b8.jpg",
  ];

  const services = [
    {
      icon: "🌾", // General icon for agricultural products and services
      title: "Fertilizers",
      description: "Fertilizers are substances added to soil or plants to provide essential nutrients that enhance growth and crop yield.",
    },
    {
      icon: "🌱", // General icon for seeds and planting
      title: "Seeds",
      description: "Seeds are plant embryos enclosed in protective coats, essential for reproduction and growth. They store nutrients to support germination and development.",
    },
    {
      icon: "🚜", // General icon for machinery and tools
      title: "Agricultural Machinery and Tools",
      description: "Includes equipment like tractors, plows, harvesters, and sprayers, used to streamline farming tasks.",
    },
    {
      icon: "🏭", // General icon for post-harvest equipment and processing
      title: "Post-Harvest Equipment",
      description: "Includes tools and machines like threshers, dryers, graders, and storage systems.",
    },
    {
      icon: "🏡", // General icon for farm infrastructure and facilities
      title: "Farm Infrastructure",
      description: "Includes essential facilities like irrigation systems, storage barns, greenhouses, and fencing.",
    },
    {
      icon: "💧", // General icon for irrigation and water systems
      title: "Irrigation Equipment",
      description: "Includes tools like sprinklers, drip systems, and pumps, designed to deliver water to crops efficiently.",
    },
  ];
  
  return (
    <>
      {
        displayProducts.length>0 ? (
          <>
          <NavBar />
      <div>
        <div className="mc">
          <div className="cs">
            <h2 className="head1">Dealer Product</h2>
            <p className="head2">PROVIDE BY VERDICA</p>
          </div>
        </div>
        <div className="categories-container">
          <h2 className="categories-heading">Categories</h2>
          <div className="styleline"></div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                <a href={`/dealer/category/${category.url}`}>
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
              <DealerPCard key={index} {...product} />
              </div>
          ))}
        </div>
        
        <div className="ppp">
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
        </div>
        <div className="services-container">
          <div className="serv">
            <h2 className="services-title">Dealer Products</h2>
            <p className="services-subtitle">
            Verdica empowers farmer to connect and sell their products directly, ensuring fair prices through a global community-driven platform.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <div className="hp">
                <h3 className="servicess-title">{service.title}</h3>
                {service.title2 && <h3 className="servicess-title">{service.title2}</h3>}
                {service.title3 && <h3 className="servicess-title">{service.title3}</h3>}
                </div>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="content-market">
    <p className="sub-heading-market">AT VERDICA</p>
    <h1 className="main-heading-market">
      Connecting Dealers and Farmers<br /> <span>For Agricultural Excellence</span>
    </h1>
    <div className="descc-market">
        <p className="description-market">
        Verdica bridges the gap between agricultural dealers and farmers, providing a platform where dealers can showcase fertilizers, equipment, seeds, and other essential farming products. This ensures farmers have access to high-quality supplies for their agricultural needs.
        </p>
        <p className="description-market">
        Through Verdica, dealers can reach a vast network of farmers, promote their products, and gain insights into farmers' specific requirements. Farmers, in turn, can explore a diverse range of trusted products, compare prices, and make informed purchasing decisions.
        </p>
        <p className="description-market">
        Our mission is to build a transparent and efficient marketplace that empowers farmers with reliable resources while enabling dealers to expand their reach and grow their businesses sustainably.
        </p>
    </div>
</div>

{/* Image Section */}
<div className="image-container-market">
    <img
        src="/Images/product.jpeg" // Placeholder image URL
        alt="Agricultural Products"
        className="farming-image-market"
    />
</div>
</div>
      <Footer />
          </>
        ) : (
          <Loader/>
        )
      }
    </>
  );
};

export default Dealer;
