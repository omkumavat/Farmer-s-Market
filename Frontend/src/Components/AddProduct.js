import React from "react";
import ProductForm from "./ProductForm";
import { useAuth } from "../Context/AuthContext";
import VerificationForm from "./VerificationForm";

const AddProduct=()=>{
    const {currentUser}=useAuth();
    // console.log(currentUser);
    return(
        <>
        {
            currentUser.role!=="other" && currentUser.verified && <ProductForm/>
        }
        {
            !currentUser.verified && currentUser.role!=="other" && <VerificationForm/>
        }
        <div>
            
        </div>
        </>
    );
}

export default AddProduct;