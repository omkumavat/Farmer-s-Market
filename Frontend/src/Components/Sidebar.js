import { useState, useEffect } from 'react';
import '../CSS/sidebar.css';
import EditProfile from './EditProfile';
import Sales from './Sales';
import Products from './Products';
import Orderes from './Orderes';
import MyCart from './MyCart';
import AddProduct from './AddProduct';
import { useAuth } from '../Context/AuthContext';
import NavBar from './NavBar';
import Footer from './Footer';

function Sidebar() {
  const { currentUser } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState('ep');
  console.log(currentUser);
  
  // Check if currentUser is loaded and not null
  useEffect(() => {
    if (currentUser !== null) {
      setIsAuthReady(true); // Mark as ready once currentUser is loaded
    }
  }, [currentUser]);

  if (!isAuthReady) {
    return <div>Loading...</div>; // Loading state while checking auth
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <>
      <NavBar />
      <div className="app-container">
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <button className="togglebtn" onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </button>
          <ul className="sidebar-menu">
            <li onClick={() => handlePageChange('ep')}>Edit Profile</li>
            <li onClick={() => handlePageChange('order')}>My Orders</li>
            <li onClick={() => handlePageChange('wish')}>My Cart</li>
            {currentUser.role !== "other" && (
              <>
                <li onClick={() => handlePageChange('sales')}>My Sales</li>
                <li onClick={() => handlePageChange('product')}>My Products</li>
                <li onClick={() => handlePageChange('addp')}>Add Product</li>
              </>
            )}
          </ul>
        </div>

        <div className="content">
          {selectedPage === 'sales' && <Sales />}
          {selectedPage === 'order' && <Orderes />}
          {selectedPage === 'product' && <Products />}
          {selectedPage === 'wish' && <MyCart />}
          {selectedPage === 'ep' && <EditProfile />}
          {selectedPage === 'addp' && <AddProduct />}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
