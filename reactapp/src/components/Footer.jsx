import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Kontakt Info</h4>
                    <p>Email: kontakt@prodajaulaznica.com</p>
                    <p>Telefon: +381 123 4567</p>
                    <p>Adresa: Ulica ulica 123, 11000 Beograd</p>
                </div>
                <div className="footer-section">
                    <h4>Mapa sajta</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Početna</Link></li>
                        <li><Link to="/dogadjaji">Događaji</Link></li>
                        <li><Link to="/register">Registruj se</Link></li>
                        <li><Link to="/login">Uloguj se</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
