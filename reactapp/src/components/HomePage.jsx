import React from 'react';
import './HomePage.css';
import image1 from './images/1.jpg';

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1>Web app za prodaju ulaznica</h1> 
            </header>

            <section className="featured-events">
                <h2>Istaknuti Događaji</h2>
                <div className="events-grid">
                
                    <div className="event">
                        <img src={image1} alt="Događaj"/>
                        <h3>Naziv Događaja</h3>
                        <p>Kratki opis događaja...</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Prodaja Ulaznica. Sva prava zadržana.</p>
            </footer>
        </div>
    );
}

export default HomePage;
