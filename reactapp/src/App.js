 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Dogadjaji from './components/Dogadjaji'; 
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import { useState } from 'react';
import TabelaDogadjaja from './components/TabelaDogadjaja';

function App() {
  const [token,setToken]= useState(null);
  return (
    <div className="App">
    <Router>
        <Navbar setToken={setToken} token={token}/>
        <Routes>
          <Route path="/" element={<Login token={token} setToken={setToken}/>} />
          <Route path="/dogadjaji" element={<Dogadjaji />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<TabelaDogadjaja />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
