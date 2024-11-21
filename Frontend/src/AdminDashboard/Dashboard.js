import { useState, useEffect } from 'react';
import '../AdminDashboardCSS/dashboard.css';
import { useAuth } from '../Context/AuthContext';
import NavBar from '../Components/NavBar';
import Verifications from './Verifications';
import FeedBacks from './FeedBacks';
import Sales from './Sales';
import Tickets from './Tickets';
import UserAnalytics from './UserAnalytics';

function Dashboard() {
  const { currentUser } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState('Home');
  console.log(currentUser);
  
  useEffect(() => {
    if (currentUser !== null) {
      setIsAuthReady(true);
    }
  }, [currentUser]);

  if (!isAuthReady) {
    return <div>Loading...</div>; 
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
      <div className="appcontainer">
        <div className={`sidebars ${isSidebarOpen ? 'open' : 'closed'}`}>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </button>
          <ul className="sidebarmenu">
            <li onClick={() => handlePageChange('tk')}>Tickets</li>
            <li onClick={() => handlePageChange('ver')}>Verifications</li>
            <li onClick={() => handlePageChange('ua')}>User Analytics</li>
            <li onClick={() => handlePageChange('sales')}>Sales</li>
            <li onClick={() => handlePageChange('fb')}>FeedBacks</li>
          </ul>
        </div>

        <div className="contents">
          {selectedPage === 'tk' && <Tickets />}
          {selectedPage === 'ver' && <Verifications />}
          {selectedPage === 'ua' && <UserAnalytics />}
          {selectedPage === 'sales' && <Sales />}
          {selectedPage === 'fb' && <FeedBacks />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
