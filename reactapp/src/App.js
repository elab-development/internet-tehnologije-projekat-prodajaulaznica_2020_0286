 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Dogadjaji from './components/Dogadjaji';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dogadjaji" element={<Dogadjaji />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;