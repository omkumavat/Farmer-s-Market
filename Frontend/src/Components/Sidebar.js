import React, { useState } from 'react';
import '../CSS/sidebar.css';
import EditProfile from './EditProfile'
import Sales from './Sales';
import Products from './Products';
import Orderes from './Orderes';
import WishList from './WishList';
import AddProduct from './AddProduct'
function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedPage, setSelectedPage] = useState('Home');
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const handlePageChange = (page) => {
      setSelectedPage(page);
    };
  
    return (
      <div className="app-container">
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </button>
          <ul className="sidebar-menu">
            <li onClick={() => handlePageChange('ep')}>Edit Profile</li>
            <li onClick={() => handlePageChange('sales')}>My Sales</li>
            <li onClick={() => handlePageChange('order')}>My Orderes</li>
            <li onClick={() => handlePageChange('product')}>My Products</li>
            <li onClick={() => handlePageChange('wish')}>WishList</li>

            <li onClick={() => handlePageChange('addp')}>Add Product</li>
          </ul>
        </div>
  
        <div className="content">
          {selectedPage === 'sales' && <h1><Sales/></h1>}
          {selectedPage === 'order' && <h1><Orderes/></h1>}
          {selectedPage === 'product' && <h1><Products/></h1>}
          {selectedPage === 'wish' && <h1><WishList/></h1>}
          {selectedPage === 'ep' && <EditProfile />}
          {selectedPage === 'addp' && <AddProduct />}
        </div>
      </div>
    );
}

export default Sidebar;