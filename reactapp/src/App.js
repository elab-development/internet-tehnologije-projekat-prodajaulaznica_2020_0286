 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Dogadjaji from './components/Dogadjaji'; 
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import { useState } from 'react';
import TabelaDogadjaja from './components/TabelaDogadjaja';
import NotFoundPage from './components/NotFoundPage';
import KupiUlaznice from './components/KupiUlaznice';

function App() {
  
  const [token,setToken]= useState(null);


  return (
    <div className="App">
    <Router>
        <Navbar setToken={setToken} token={token}/>
        <Routes>
          <Route path="/" element={<Login  setToken={setToken}/>} />
          <Route path="/dogadjaji" element={<Dogadjaji />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kupiUlaznicu" element={<KupiUlaznice />} />
          <Route path="/admin" element={<TabelaDogadjaja />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
