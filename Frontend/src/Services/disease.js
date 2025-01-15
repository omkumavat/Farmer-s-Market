import React, { useState } from 'react';
import axios from 'axios';
import "../ServicesCSS/disease.css";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const Disease = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMessage(''); // Reset success message on new file selection
  };

  const handleUpload = async () => {
    if (!file) return alert('Please upload a file!');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
      setSuccessMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
          <NavBar />
          {/* Header Section */}
        <div className="aboutusheader">
          <div className="headerimage"></div>
          <div className="headertext">
            <h1>Disease Detection and Pesticide Prediction</h1>
            <h2>At VERDICA</h2>
          </div>
        </div>
    <div className="app-container">
      <h1>Plant Disease Detection</h1>
      <label htmlFor="file-upload" className="upload-label">Choose Image</label>
      <input type="file" id="file-upload" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Detect</button>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {result && (
        <div className="result-container">
          <h3>Detection Results:</h3>
          <p><strong>Disease:</strong> {result.disease}</p>
          <p><strong>Recommended Pesticide:</strong> {result.pesticide}</p>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Disease;
