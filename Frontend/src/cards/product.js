import React, { useState, useEffect } from "react";
import "../CARDCSS/product.css";
import pmethodImage from "../Images/pmethod.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; // Import Google Maps components
import { color } from "framer-motion";
import Loader from "../Components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles


const DProduct = ({ id ,avgRating,clickRate}) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [Desc, setDesc] = useState("");
  const [amount,setAmount]=useState(0);
  const [quant,setQuant]=useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [originalAmount,setOriginalAmount]=useState(0);
  const [isPresent,setIsPresent]=useState(false);
  const [isAuthReady,setIsAuthReady]=useState(false);


  const handleAddToCart = async () => {
    setIsAuthReady(true);
    try {
      if (currentUser) {
        const response = await axios.post('https://farmer-s-market-theta.vercel.app/server/dealer/addtocart', {
          userId: currentUser._id,
          productId: product._id,
        });
        toast.success("Item added to WishList successfully");
        setIsPresent(true); // Update the state here
      } else {
        toast.error("Please login first");
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Error adding to wishlist');
    }
    setIsAuthReady(false);
  };

  useEffect(() => {
    setIsAuthReady(true);
    console.log("rate",avgRating)
    const fetchProductDetails = async () => {
      try {
        setRating(avgRating)
        const response = await axios.get(
          `https://farmer-s-market-theta.vercel.app/server/dealer/getproductbyid/${id}`
        );
        const data = response.data;
  
        setProduct(data);
        console.log(data);
        setMainImage(data.images[0]);
  
        const arr = [];

        const dt={
          size:data.size,
          unit:data.sizeUnit,
          price:data.price
        }
        arr.push(dt);

  
        const combinedVariants = [
          ...data.largerSizes.map((size) => ({ ...size, type: "Larger" })),
          ...data.smallerSizes.map((size) => ({ ...size, type: "Smaller" })),
          ...arr.map((size) => ({ ...size, type: "Smaller" })),
        ];
        setVariants(combinedVariants);
        console.log(combinedVariants);
  
        const cleanText = data.desc
        .replace(/&nbsp;/g,' ')
        .replace(/&amp;/g, '')
          .replace(/<strong>(.*?)<\/strong>/g, '$1') // Remove <strong> but keep text
          .replace(/<ul>/g, '') // Remove <ul> tags
          .replace(/<\/ul>/g, '\n') // Replace </ul> with a new line for list
          .replace(/<ol>/g, '') // Remove <ol> tags
          .replace(/<\/ol>/g, '\n') // Replace </ol> with a new line for ordered list
          .replace(/<li>/g, ' - ') // Remove <li> tags
          .replace(/<\/li>/g, '\n') // Replace </li> with a new line and bullet point
          .replace(/<h3>/g, '\n\n') // Add line breaks before headers
          .replace(/<\/h3>/g, '\n') // Add line breaks after headers
          .replace(/<br>/g, '\n')
          .replace(/<[^>]+>/g, ''); // Remove any remaining HTML tags
        setDesc(cleanText);
  
        if (combinedVariants.length > 0) {
          setSelectedVariant(combinedVariants[0]);
          setAmount(combinedVariants[0].price);
          setOriginalAmount(combinedVariants[0].price);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    const fetchWishStatus = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(
            `https://farmer-s-market-theta.vercel.app/server/dealer/check-cart/${id}/${currentUser?._id}`
          );
          const data = response.data;
          console.log(data);
          setIsPresent(data.isPresent);
        } catch (error) {
          console.error("Error fetching wishlist status:", error);
        }
      }
    };
    
    fetchWishStatus();
    fetchProductDetails();
    setIsAuthReady(false);
  }, [avgRating]);
  

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleVariantClick = (variant) => {
    console.log(variant);
    setAmount(variant.price)
    setOriginalAmount(variant.price);
    setSelectedVariant(variant);
    setQuant(1);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleRatingClick = () => {
    console.log(true);
    clickRate(true);
    console.log(clickRate)
  };

  const handlePayment = async () => {
    try {
      const currentDate=new Date();
      const data = {
        pname:product.name,
        pprice:product.price,
        pdate:currentDate,
        pquantity:product.quantity,
        subject: "Your Order Was Successfuly Placed",
        caseType: 3,
        email: 'omkumavat2004@gmail.com',
        name:currentUser.name,
      }
      if (currentUser) {
        // amount=amount*quant;
        const response = await fetch('https://farmer-s-market-theta.vercel.app/api/payment/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });

        const order = await response.json();

        const options = {
          key: 'rzp_test_nwUngHToxCY8p6',
          amount: order.amount * 100,
          currency: order.currency,
          name: 'AgriHaven',
          description: 'Payment for your product',
          order_id: order.id,
          handler: async function (response) {
            try {
              const verificationResponse = await fetch('https://farmer-s-market-theta.vercel.app/api/payment/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: currentUser._id,
                  productId: product._id,
                  amount,
                }),
              });

              const result = await verificationResponse.json();

              if (verificationResponse.ok) {
                const createOrderResponse = await fetch('https://farmer-s-market-theta.vercel.app/server/orders/create-order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // productType: 'DealerProduct',
                    productId: product._id,
                    buyer: currentUser._id,
                    sellerId:product.dealerid.sellerId,
                    quantity: quant,
                    price: amount,
                    shippingAddress: shippingAddress,
                  }),
                });
                
                const orderData = await createOrderResponse.json();
                const responses = await axios.post("https://farmer-s-market-theta.vercel.app/server/sendmail", data);

                if (createOrderResponse.ok && responses.ok) {
                  toast.success('Payment successful and order created!');
                } else {
                  toast.error('Error creating order: ' + orderData.message);
                }
              } else {
                toast.error(result.message || 'Error saving payment');
              }
            } catch (error) {
              console.error('Error during payment verification:', error);
              toast.error('Error during payment verification');
            }
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9876543210',
          },
          theme: {
            color: '#F37254',
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error('Please login first');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      toast.error('Error while initiating payment');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const incrementQuantity = () => {
    const newQuantity = quant + 1;
    setQuant(newQuantity);
    setAmount(newQuantity * originalAmount);
  };

  const decrementQuantity = () => {
    if (quant > 1) {
      const newQuantity = quant - 1;
      setQuant(newQuantity);
      setAmount(newQuantity * originalAmount);
    }
  };

  const handleDeleteWish = async () => {
    setIsAuthReady(true);
    try {
      const userId = currentUser._id;
      const cartId = id;
      const response = await axios.delete(
        `https://farmer-s-market-theta.vercel.app/server/dealer/delete-wish/${userId}/${cartId}`
      );
      toast.success("Item removed from WishList successfully");
      setIsPresent(false); // Update the state here
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast.error('Error removing item from wishlist');
    }
    setIsAuthReady(false);
  };

if(isAuthReady){
  <Loader/>
}
  

  return (
     <> <ToastContainer />
    <div className="product-container">
      {/* Image Section */}
      <div className="image-section">
        <div className="main-image">
          <img src={mainImage} alt="Selected product" />
        </div>
        <div className="thumbnail-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${mainImage === image ? "selected-thumbnail" : ""
                }`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Shipping Address</h2>
            <button onClick={openModal}>Use Current Location</button>
            <input
              type="text"
              placeholder="Enter Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
            <LoadScript googleMapsApiKey="AIzaSyD0w1lvfJkEcNqp-3gJ-9s8GSLr8GrhzoQ">
              <GoogleMap
                center={currentLocation}
                zoom={14}
                mapContainerStyle={{ width: "100%", height: "400px" }}
              >
                {currentLocation.lat && currentLocation.lng && (
                  <Marker position={currentLocation} />
                )}
              </GoogleMap>
            </LoadScript>
            <button onClick={handlePayment}>Pay Now</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}


      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="brand-name">{product.title || "Unknown Brand"}</p>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "selected" : ""}`}
              onClick={() => handleRatingClick}
            >
              ★
            </span>
          ))}
          <span className="rating-text">
            ({rating})
          </span>
        </div>

        {/* Price Section */}
        <div className="price-section">
          {selectedVariant && (
            <>
              <span className="current-price">₹{selectedVariant.price}</span>
              <span className="original-price">
                ₹{(selectedVariant.price * 1.1).toFixed(2)}
              </span>
              <br></br>
              <span className="discount">
                Save : ₹{(selectedVariant.price * 0.1).toFixed(2)}
              </span>
              <br></br>
              <span>Size : {selectedVariant.size}{selectedVariant.unit}</span>
            </>
          )}
        </div>
          
        
        {/* Variants Section */}
        <div className="variant-section">
          <h4>Variants</h4>
          <div className="variants">
            {variants.map((variant, index) => (
              <div
                key={index}
                className={`variant ${selectedVariant?.size === variant.size ? "active" : ""
                  }`}
                onClick={() => handleVariantClick(variant)}
              >
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;{variant.size}{variant.unit}&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <p>₹{variant.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.container}>
      <div style={styles.quantityWrapper}>
        <button onClick={decrementQuantity} style={styles.button}>
          -
        </button>
        <span style={styles.quantity}>{quant}</span>
        <button onClick={incrementQuantity} style={styles.button}>
          +
        </button>
      </div>
      <p style={styles.price}>
        Total Price: ₹{amount}
      </p>
    </div>

        {/* Extra Information */}
        <div className="extra-info">
          <div className="checkbox-item">
            <img src="/Images/pcard1.png"></img><label> Country of Origin: India</label>
          </div>
          <div className="checkbox-item">
            <img src="/Images/pcard2.png"></img> <label>Secure Payments</label>
          </div>
          <div className="checkbox-item">
            <img src="/Images/pcard3.png"></img> <label>In stock, Ready to Ship</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-section">
          {
            currentUser && isPresent ? (
              <button className="add-to-cart" onClick={handleDeleteWish}>Remove from WishList</button>
            ) : (
              <button className="add-to-cart" onClick={handleAddToCart}>Add to WishList</button>
            )
          }
          <button className="buy-now" onClick={openModal}>Buy Now</button>
        </div>
      </div>

      {/* Product Description */}
      <div className="product-description">
        <h3>Product Description</h3>
        <pre>{Desc || "No description available."}</pre>
      </div>
      <div className="product-image-container">
        <img src={pmethodImage} alt="Payment Method" />
      </div>
    </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    fontFamily: "Arial, sans-serif",
  },
  quantityWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color:"black"
  },
  button: {
    fontSize: "18px",
    padding: "5px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
    color:"black"
  },
  quantity: {
    fontSize: "16px",
    fontWeight: "bold",
    padding: "0 10px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default DProduct;
