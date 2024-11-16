import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login';
import Signup from './Pages/SignUp';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
