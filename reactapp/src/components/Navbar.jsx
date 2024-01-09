import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import './Navbar.css';

const Navbar = ({token,setToken}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');   

        
            try {
                await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                sessionStorage.removeItem('token');
                setToken(null);
                navigate('/');
            } catch (error) {
                console.error('Došlo je do greške prilikom odjavljivanja', error);
            }
        
    };

    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => navigate('/')}>Logo</div>
            <div className="nav-items">
                  {/* neulogovani korisnici mogu da pregledaju dogadjaje sa spoljog apija */}
                 <div onClick={() => navigate('/dogadjaji')}>Događaji</div> 
                 {/* samo ulogovani korisnici mogu da rade crud operacije nad dogadjajima iz nase baze */}
                {!token && <div onClick={() => navigate('/')}>Uloguj se</div>}   
                {!token &&  <div onClick={() => navigate('/register')}>Registruj se</div>}
                {token &&  <div onClick={() => navigate('/admin')}>Admin</div>}
                {token && <div onClick={handleLogout}>Logout</div>}  
            </div>
        </nav>
    );
}

export default Navbar;
