import React from "react";
import ProductForm from "./ProductForm";
import { useAuth } from "../Context/AuthContext";

const AddProduct=()=>{
    const {currentUser}=useAuth();
    // console.log(currentUser);
    return(
        <>
        {
            currentUser.role!=="other" && <ProductForm/>
        }
        <div>
            
        </div>
        </>
    );
}

export default AddProduct;