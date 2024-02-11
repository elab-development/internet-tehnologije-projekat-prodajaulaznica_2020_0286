import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import './Navbar.css';

const Navbar = ({token, setToken}) => {
    const navigate = useNavigate();
    const [userRole, setUserRole] =  useState(null);

    useEffect(() => {
        const storedUserRole = localStorage.getItem('uloga');
        setUserRole(storedUserRole);
        console.log(storedUserRole)
    }, []);

    useEffect(() => {
        if (!token) {
            setUserRole(null); // Reset user role if token is not present
        }
    }, [token]);

    const handleLogout = async () => {         
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');  
            localStorage.removeItem('uloga');
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
            {token ? (
                <>
                    <div onClick={() => navigate('/dogadjaji')}>Događaji</div>
                    {localStorage.getItem('uloga') === 'admin' && <div onClick={() => navigate('/admin')}>Admin</div>}
                    {localStorage.getItem('uloga') === 'korisnik' && <div onClick={() => navigate('/kupiUlaznicu')}>Kupi ulaznicu</div>}
                    {localStorage.getItem('uloga') === 'korisnik' && <div onClick={() => navigate('/mojeUlaznice')}>Moje ulaznice</div>}
                    <div onClick={handleLogout}>Logout</div>
                </>
            ) : (
                <>
                    <div onClick={() => navigate('/register')}>Registracija</div>
                    <div onClick={() => navigate('/')}>Login</div>
                </>
            )}
        </div>
    </nav>
    
    );
}

export default Navbar;
