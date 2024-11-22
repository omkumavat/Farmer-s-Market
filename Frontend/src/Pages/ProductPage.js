import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Product from '../cards/product';
import axios from "axios";
import { useParams } from "react-router-dom";
import DealerPCard from "../Components/DealerPCard";

const ProductPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState("");
    const [Products, setProducts] = useState({});
    const [CategoryProduct, setCategoryProduct] = useState([]);

    useEffect(() => {
        // Fetch product by ID
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/server/dealer/getproductbyid/${id}`
                );
                const data = response.data;
                setProducts(data);
                setCategory(data.category); 
            } catch (error) {
                console.error("Error fetching product by ID:", error);
            }
        };

        fetchProduct();
    }, [id]); 

    useEffect(() => {
        if (category) {
            axios
                .get(`http://localhost:4000/server/dealer/getproductbycategory/all?category=${category}`)
                .then((response) => {
                    setCategoryProduct(response.data.data);
                })
                .catch((error) => console.error("Error fetching products by category:", error));
        }
    }, [category]); 

    return (
        <>
            <NavBar />
            <div>
                <Product id={id} />
            </div>
            <div>
                <div className="product-list">
                    {CategoryProduct.map((product, index) => (
                        <div key={index}> 
                           {product._id!==id &&  <DealerPCard {...product} />}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductPage;
