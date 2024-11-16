import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Contact from "./Pages/Contact";
import About from "./Pages/About"

function App() {
  return (
    <div>
      <Routes>
      <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
