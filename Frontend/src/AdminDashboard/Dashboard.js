import { useState, useEffect } from 'react';
import '../AdminDashboardCSS/dashboard.css';
import { useAuth } from '../Context/AuthContext';
import NavBar1 from './dashNav';
import Verifications from './Verifications';
import FeedBacks from './FeedBacks';
import Sales from './Sales';
import Tickets from './Tickets';
import UserAnalytics from './UserAnalytics';

function Dashboard() {
  const { currentUser } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Home');
  // console.log(currentUser);
  
  useEffect(() => {
    if (currentUser !== null) {
      setIsAuthReady(true);
    }
  }, [currentUser]);

  if (!isAuthReady) {
    return <div>Loading...</div>; 
  }

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <>
      <NavBar1 />
      <div className="appcontainer">
        <div className="sidebars open"> {/* Sidebar is always open now */}
          <ul className="sidebarmenu">
            <li onClick={() => handlePageChange('tk')}>Tickets</li>
            <li onClick={() => handlePageChange('ver')}>Verifications</li>
            <li onClick={() => handlePageChange('ua')}>User Analytics</li>
          </ul>
        </div>

        <div className="contents">
          {selectedPage === 'tk' && <Tickets />}
          {selectedPage === 'ver' && <Verifications />}
          {selectedPage === 'ua' && <UserAnalytics />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
