import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => navigate('/')}>Logo</div>
            <div className="nav-items">
              
                <div onClick={() => navigate('/dogadjaji')}>Događaji</div>
                <div onClick={() => navigate('/login')}>Uloguj se</div>
                <div onClick={() => navigate('/register')}>Registruj se</div>
            </div>
        </nav>
    );
}

export default Navbar;
