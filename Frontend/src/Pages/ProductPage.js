import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Product from '../cards/product';
import { useParams } from "react-router-dom";
const ProductPage=()=>{
    const {id}=useParams();
    return(
        <>
        <NavBar/>
        <div>
            <Product id={id}/>
        </div>
        <Footer/>
        </>
    );
}

export default ProductPage;