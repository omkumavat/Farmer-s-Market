import React from 'react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a
        href="/"
        style={{
          textDecoration: 'none',
          color: 'blue',
          marginTop: '20px',
          display: 'inline-block', 
        }}
      >
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
