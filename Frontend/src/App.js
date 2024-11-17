import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Team from "./Pages/Team";
import Landpreservation from "./Solutions/Landpreservation"
import WaterManagement from "./Solutions/WaterManagement"
import Equipmentinstallation from "./Solutions/Equipmentinstallation"
import Farminspection from "./Solutions/Farminspection"
import Soilanalysis from "./Solutions/Soilanalysis"
import Farmplans from "./Solutions/Farmplans"
import WeatherUpdates from './Services/Weather'
import Dealer from './Services/Dealer';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/Landpreservation" element={<Landpreservation />} />
        <Route path="/WaterManagement" element={<WaterManagement />} />
        <Route path="/Equipmentinstallation" element={<Equipmentinstallation />} />
        <Route path="/Farminspection" element={<Farminspection />} />
        <Route path="/Soilanalysis" element={<Soilanalysis />} />
        <Route path="/Farmplans" element={<Farmplans />} />
        <Route path="/weather" element={<WeatherUpdates />} />
        <Route path="/dealer" element={<Dealer/>} />
      </Routes>
    </div>
  );
}

export default App;
