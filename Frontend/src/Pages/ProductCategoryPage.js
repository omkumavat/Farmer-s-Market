import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DealerPCard from "../Components/DealerPCard";
const ProductCategoryPage = () => {
    const { category } = useParams();
    console.log(category);
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);

    // Fetch data based on route
    useEffect(() => {
        if (category) {
            // Fetch products by category
            axios
                .get(`http://localhost:4000/server/dealer/getproductbycategory/all?category=${category}`)
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
            <div className="product-display-page">
                {category && (
                    <>
                        <h1>Products in Category: {category}</h1>
                        <div className="product-list">
                            {products.map((product, index) => (
                                    <div>
                                        <DealerPCard {...product} />
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
        </>
    );
}

export default ProductCategoryPage;