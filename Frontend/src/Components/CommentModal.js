import React, { useState } from "react";
import "../CSS/comments.css";

function CommentModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0 && comment.trim()) {
      onSubmit({ rating, comment, date: new Date().toLocaleDateString() });
    } else {
      alert("Please provide a rating and comment.");
    }
  };

  return (
    <div className="modal-comment-overlay">
      <div className="modalss">
        <h2>Write a Review</h2>
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "active" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
