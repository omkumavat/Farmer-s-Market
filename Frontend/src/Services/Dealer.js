import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import '../ServicesCSS/dealer.css'

const Dealer = () => {

    const services = [
        {
            icon: "🧑‍🌾", // Replace with your SVG or image
            title: "Fertilizers",
            description: "Homes and thoroughly launder them between usage. We give our teams.",
        },
        {
            icon: "🍎", // Replace with your SVG or image
            title: "Seeds",
            description: "We are closely monitoring national, state and local health developments.",
        },
        {
            icon: "🐄", // Replace with your SVG or image
            title: "Agricultural Machinery and Tools",
            description: "Follow these tips from the CDC to help prevent the spread of the seasonal.",
        },
        {
            icon: "🌾", // Replace with your SVG or image
            title: "Post-Harvest Equipment",
            description: "Industra plays a large role in the comfort of your home, but many.",
        },
        {
            icon: "🚜", // Replace with your SVG or image
            title: "Farm Infrastructure",
            description: "We realize that every family has their own preferences, so we accommodate.",
        },
        {
            icon: "📋", // Replace with your SVG or image
            title: "Irrigation Equipment",
            description: "While some cleaning companies use rotating cleaning plans, we’re equipped.",
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
            </div>
            <Footer />
        </>
    );
}

export default Dealer;