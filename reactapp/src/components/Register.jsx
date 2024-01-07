import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        kontakt: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register', formData);
            navigate('/login');
        } catch (error) {
            console.error('Greška prilikom registracije', error.response.data);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Registruj se</h2>
                <input type="text" name="name" placeholder="Ime" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Lozinka" value={formData.password} onChange={handleChange} required />
                <input type="text" name="kontakt" placeholder="Kontakt" value={formData.kontakt} onChange={handleChange} required />
                <button type="submit" className="register-btn">Registruj se</button>
            </form>
        </div>
    );
};

export default Register;
