 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Dogadjaji from './components/Dogadjaji'; 
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dogadjaji" element={<Dogadjaji />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
