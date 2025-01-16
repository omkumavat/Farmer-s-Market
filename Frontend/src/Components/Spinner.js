import React from 'react';
import '../CSS/spinner.css'; // Include the CSS file

const Spinner = () => {
    return (
        <div className="orbit-container">
            <div className="sun"></div>
            <div className="moon-orbit">
                <div className="moon"></div>
            </div>
        </div>
    );
};

export default Spinner;
