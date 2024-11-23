import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Team from "./Pages/Team";
import Landpreservation from "./Solutions/Landpreservation";
import WaterManagement from "./Solutions/WaterManagement";
import Equipmentinstallation from "./Solutions/Equipmentinstallation";
import Farminspection from "./Solutions/Farminspection";
import Soilanalysis from "./Solutions/Soilanalysis";
import Farmplans from "./Solutions/Farmplans";
import WeatherUpdates from './Services/Weather';
import Dealer from './Services/Dealer';
import Sidebar from './Components/Sidebar';
import Market from "./Services/Market";
import Farmer from './Services/Farmer';
import Dashboard from './AdminDashboard/Dashboard'
import { AuthProvider, useAuth } from './Context/AuthContext';
import ProductPage from './Pages/ProductPage'
import ProductCategoryPage from './Pages/ProductCategoryPage';
import PaymentButton from './cards/payment'
import Loader from './Components/Loader';
import TicketPage from './Pages/TicketPage';
import FarmerProductCategoryPage from './Pages/FarmerProductCategoryPage';
import Soil from "./Services/Soil";


function App() {
  const { currentUser } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);
 

  useEffect(() => {
    if (currentUser !== undefined) {
      setIsAuthReady(true); // Mark as ready once currentUser is loaded
    }
  }, [currentUser]);

  if (!isAuthReady) {
    return <Loader/>;
  }
  // localStorage.clear();
  const isAdmin = currentUser && currentUser?.role === "admin";
  console.log(isAdmin);

  return (
    <div>
      <AuthProvider>
        <Routes>
          {/* Admin-Only Routes */}
          {isAdmin && (
            <>
              <Route path="/dash" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/dash" />} />
            </>
          )}


          {/* Non-Admin Routes */}
          {!isAdmin && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/landpreservation" element={<Landpreservation />} />
              <Route path="/watermanagement" element={<WaterManagement />} />
              <Route path="/equipmentinstallation" element={<Equipmentinstallation />} />
              <Route path="/farminspection" element={<Farminspection />} />
              <Route path="/soilanalysis" element={<Soilanalysis />} />
              <Route path="/farmplans" element={<Farmplans />} />
              <Route path="/weather" element={<WeatherUpdates />} />
              <Route path="/dealer" element={<Dealer />} />
              <Route path="/dealer/category/:category" element={<ProductCategoryPage />} />
              <Route path="/farmer/category/:category" element={<FarmerProductCategoryPage />} />
              <Route path="/dealer/:id/product" element={<ProductPage />} />
              <Route path="/farmer" element={<Farmer />} />
              <Route path="/market" element={<Market />} />
              <Route path="/dashboard" element={<Sidebar />} />
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/payment" element={<PaymentButton  />} />
              <Route path="/ticket" element={<TicketPage  />} />
              <Route path="/soil" element={<Soil  />} />
            </>
          )}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
