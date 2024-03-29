import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({setToken}) => {
    const [credentials, setCredentials] = useState({
        email: 'pera@gmail.com',
        password: 'pera',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log(credentials)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('uloga', response.data.user.uloga);
            setToken(response.data.token);
            console.log(response.data.user)
            const uloga = response.data.user.uloga;

            if (uloga === 'admin') {
                navigate('/admin');
            } else if (uloga === 'korisnik') {
                navigate('/dogadjaji');
            } else {
               
            }

        } catch (error) {
            console.error('Greška prilikom prijavljivanja', error.response.data);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Prijavi se</h2>
                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Lozinka" value={credentials.password} onChange={handleChange} required />
                <button type="submit" className="login-btn">Prijavi se</button>
            </form>
        </div>
    );
};

export default Login;
