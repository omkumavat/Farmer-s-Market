import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Product from '../cards/product';
import FarmerProduct from "../cards/FarmerProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
import DealerPCard from "../Components/DealerPCard";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Components/Loader";

const ProductPage = () => {
    const { id } = useParams();
    const {currentUser}=useAuth();
    const [isAuthReady,setisAuthReady]=useState(false);
    const [category, setCategory] = useState("");
    const [Products, setProducts] = useState({});
    const [FarmerProducts, setFarmerProducts] = useState({});
    const [CategoryProduct, setCategoryProduct] = useState([]);

    useEffect(() => {
        setisAuthReady(true);
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/server/dealer/getproductbyid/${id}`
                );
                const data = response.data;
                setProducts(data);
                console.log("aaa",data);
                setCategory(data.category); 
            } catch (error) {
                console.error("Error fetching product by ID:", error);
            }
        };

        const fetchFarmerProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/server/farmer/getproductbyid/${id}`
                );
                const data = response.data;
                console.log("aaa",data);
                setFarmerProducts(data);
                // setCategory(data.category); 
            } catch (error) {
                console.error("Error fetching product by ID:", error);
            }
        };

        fetchProduct();
        fetchFarmerProduct();
        setisAuthReady(false);
    }, [id]); 

    useEffect(() => {
        setisAuthReady(true);
        if (category) {
            axios
                .get(`http://localhost:4000/server/dealer/getproductbycategory/all?category=${category}`)
                .then((response) => {
                    setCategoryProduct(response.data.data);
                })
                .catch((error) => console.error("Error fetching products by category:", error));
        }
        setisAuthReady(false);
    }, [category]); 

    if(isAuthReady){
        return <Loader/>;
    }

    return (
        <>
            <NavBar />
            <div>
                   {  Object.keys(FarmerProducts).length !== 0 && <FarmerProduct id={id}/>}
                   { Object.keys(Products).length !== 0 && <Product id={id}/>}
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
