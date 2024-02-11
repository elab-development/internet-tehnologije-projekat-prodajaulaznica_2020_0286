
import React, { useEffect, useState } from 'react';
import './DogadjajKartica.css';
import image1 from './images/1.jpg';
import axios from 'axios';
 
const DogadjajKartica = ({ dogadjaj,onKupiClick}) => {
    const [slikaUrl, setSlikaUrl] = useState('');

    useEffect(() => {
        // Funkcija koja dohvaća random sliku za dati tip događaja
        const fetchSlika = async () => {
            try {
                 
                const response = await axios.get(`https://api.unsplash.com/photos/random?query=${dogadjaj.tip.naziv}&client_id=mgvH-dYb-0DA4vZU8jJbPSh6dJr9p4BkoaBx9alFrKA`);
                setSlikaUrl(response.data.urls.regular);
            } catch (error) {
                console.error('Greška pri dohvatanju slike sa Unsplash-a', error);
              
                setSlikaUrl(image1);  // Postavite neku podrazumevanu sliku u slučaju greške
            }
        };

        fetchSlika();
    }, [dogadjaj.tip.naziv]);
    return (
        <div className="dogadjaj-kartica">
            <div className="dogadjaj-slika-container">
             <img src={slikaUrl || image1} alt={dogadjaj.naziv} className="dogadjaj-slika" />
                <span className="dogadjaj-tip">{dogadjaj.tip.naziv}</span>
            </div>
            <div className="dogadjaj-info">
                <h3>{dogadjaj.naziv}</h3>
                <p>{new Date(dogadjaj.datumVreme).toLocaleString()}</p>
                <p>Mesto: {dogadjaj.mesto}</p>
                <p>Organizator: {dogadjaj.organizator}</p>
                <p>Kapacitet: {dogadjaj.kapacitet}</p>
                <p>ostalo jos: {dogadjaj.br_mesta} slobodnih mesta</p>
                <button onClick={()=>onKupiClick(dogadjaj)}>Kupi ulaznice</button>
            </div>
        </div>
    );
}

export default DogadjajKartica;

