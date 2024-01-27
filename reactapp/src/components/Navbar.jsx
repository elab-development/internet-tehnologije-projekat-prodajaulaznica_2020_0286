import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import './Navbar.css';

const Navbar = ({token,setToken}) => {
    const navigate = useNavigate();
    const [userRole, setUserRole] =  useState(null);
    useEffect(() => {
        // Funkcija za dobijanje uloge korisnika iz local storage-a
        const getUserRoleFromLocalStorage = () => {
          const storedUserRole =  localStorage.getItem('uloga');
          setUserRole(storedUserRole);
        };
    
        getUserRoleFromLocalStorage();
      }, []);
   
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
            
            <div onClick={() => navigate('/dogadjaji')}>Događaji</div>
            {userRole == 'admin' && <div onClick={() => navigate('/admin')}>Admin</div>}
            {userRole == 'korisnik' && <div onClick={() => navigate('/dogadjaji')}>Događaji</div>}
            {token && <div onClick={handleLogout}>Logout</div>}
          </div>
        </nav>
      );
}

export default Navbar;
