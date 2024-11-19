import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import '../ServicesCSS/dealer.css'

const Farmer = () => {

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