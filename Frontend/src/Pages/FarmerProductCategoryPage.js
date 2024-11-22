import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DealerPCard from "../Components/DealerPCard";
import FarmerProduct from "../Components/FarmerProduct";
import '../CSS/farmerproductcategorypage.css'
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
const FarmerProductCategoryPage = () => {
    const { category } = useParams();
    console.log(category);
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);

    // Fetch data based on route
    useEffect(() => {
        if (category) {
            // Fetch products by category
            axios
                .get(`http://localhost:4000/server/farmer/getproductbycategory/all?category=${category}`)
                .then((response) => {
                    setProducts(response.data.data);
                })
                .catch((error) => console.error("Error fetching products by category:", error));
        }
        // } else if (id) {
        //     // Fetch single product by ID
        //     axios
        //         .get(`http://localhost:4000/server/dealer/getproduct/${id}`)
        //         .then((response) => {
        //             setSingleProduct(response.data.data);
        //         })
        //         .catch((error) => console.error("Error fetching product by ID:", error));
        // }
    }, [category, setProducts]);

    return (
        <>
        <NavBar/>
            <div className="product-display-page">
                {category && (
                    <>
                        <h1>Products in Category: {category}</h1>
                        <div className="product-list">
                            {products.map((product, index) => (
                                    <div>
                                        <FarmerProduct {...product} />
                                    </div>
                            ))}
                        </div>
                    </>
                )}

                {/* {id && singleProduct && (
                    <div className="product-details">
                        <h1>{singleProduct.name}</h1>
                        <img src={singleProduct.image} alt={singleProduct.name} />
                        <p>{singleProduct.description}</p>
                        <p>Price: {singleProduct.price}</p>
                        <p>Category: {singleProduct.category}</p>
                    </div>
                )} */}
            </div>
            <Footer/>
        </>
    );
}

export default FarmerProductCategoryPage;