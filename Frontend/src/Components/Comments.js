import React, { useState,useRef, useEffect } from "react";
import axios from "axios";
import CommentModal from "./CommentModal";
import "../CSS/comments.css";
import { useAuth } from "../Context/AuthContext";

const Comments = ({ id, sourceType,onAvgRatingUpdate,clickRate }) => {
  const commentsSectionRef = useRef();
  // // console.log(sourceType);
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [avgRating, setAvgRating] = useState(0); // To store the average rating

  const formatDate = (dateString) => {
    // Split the date string into day, month, and year
    const [month, day, year] = dateString.split('/');
  
    // Define an array with month names
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Return the formatted date as "21 January 2025"
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };
  

  // Function to calculate the average rating
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
  };

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let response;
        if (sourceType === "dealer") {
          response = await axios.get(`https://farmer-dealer-user.vercel.app/dealer/get-comment/${id}`);
        } else {
          response = await axios.get(`https://farmer-dealer-user.vercel.app/farmer/get-comment/${id}`);
        }

        const fetchedReviews = response.data.comments || [];
        setReviews(fetchedReviews);

        // Calculate the average rating after reviews are fetched
        setAvgRating(calculateAverageRating(fetchedReviews));
        onAvgRatingUpdate(calculateAverageRating(fetchedReviews)); 
        // // console.log(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id, sourceType]);

  useEffect(()=>{
    if (clickRate) {
      commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  },[clickRate])

  const addReview = (newReview) => {
    const userId = currentUser._id;
    newReview.userId = userId;
    // // console.log(newReview);

    const url =
      sourceType === "dealer"
        ? `https://farmer-dealer-user.vercel.app/dealer/post-comment/${id}`
        : `https://farmer-dealer-user.vercel.app/farmer/post-comment/${id}`;

    axios
      .post(url, newReview)
      .then((response) => {
        // // console.log(response.data); // Log the full response to verify structure
        setReviews((prev) => [
          response.data.comment || response.data,
          ...prev,
        ]);
        setAvgRating(calculateAverageRating([...reviews, response.data.comment || response.data])); // Recalculate average rating
        onAvgRatingUpdate(avgRating);
        setShowModal(false);
        window.location.reload(); // Reload after adding a review
      })
      .catch((error) => console.error("Error posting review:", error));
  };

  return (
    <>
      <h1>Customer Reviews</h1>
      <div className="app-comment-container" ref={commentsSectionRef}>
        <div>
          <p>Review this product</p>
          <p>Share your thoughts with other customers</p>
          <div className="average-rating">
            <h2>{"⭐️".repeat(avgRating || 0)}&nbsp;{avgRating}</h2>
            <p>Average Ratings</p>
          </div>
          <button className="add-review-button" onClick={() => setShowModal(true)}>
            Write a Product Review
          </button>
        </div>
        <div className="right-side">
          {/* Display average rating */}

          <div className="review-list">
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to leave one!</p>
            ) : (
              reviews.map((review, index) => (
                <div className="review-item" key={index}>
                  <div className="review-header">
                    <span className="reviewer">{review.name || "Verified User"}</span>
                    <span className="rating">
                      {"⭐️".repeat(review.rating || 0)} {/* Ensure rating is valid */}
                    </span>
                  </div>
                  <div className="review-date">Review on {formatDate(review.date)}</div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
        {showModal && (
          <CommentModal onClose={() => setShowModal(false)} onSubmit={addReview} />
        )}
      </div>
    </>
  );
};

export default Comments;
