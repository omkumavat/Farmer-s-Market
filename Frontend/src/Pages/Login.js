import React, { useState } from 'react';
import '../CSS/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FarmerLogin = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/auth/farmerlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          localStorage.setItem('valid', true);
          navigate('/farmer-dashboard'); // Redirect to Farmer Dashboard
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">
          {error && error}
        </div>
        <h2>Farmer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email:</strong></label>
            <input 
              type="email" 
              name="email" 
              autoComplete="off" 
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })} 
              className="form-control rounded-0" 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password:</strong></label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password"
              onChange={(e) => setValues({ ...values, password: e.target.value })} 
              className="form-control rounded-0" 
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">Log in</button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="tick">You agree with terms & conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerLogin;
