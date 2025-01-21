import React, { useState } from "react";
import axios from "axios";

const PestDiseaseUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Handle image selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle form submission to send image to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Sending image to the backend API
      const response = await axios.post("http://localhost:4000/api/pest-disease/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      setError("Error detecting pest or disease.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image of Pest or Disease</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="result">
          <h3>Identification Result</h3>
          <p><strong>Issue: </strong>{result.className}</p>
          <p><strong>Suggested Solution: </strong>{result.solution}</p>
        </div>
      )}
    </div>
  );
};

export default PestDiseaseUpload;
