
import React from 'react';
import './DogadjajKartica.css';
import image1 from './images/1.jpg';
// {dogadjaj.slika}
const DogadjajKartica = ({ dogadjaj,onKupiClick}) => {
    return (
        <div className="dogadjaj-kartica">
            <div className="dogadjaj-slika-container">
                <img src={image1} alt={dogadjaj.naziv} className="dogadjaj-slika" />
                <span className="dogadjaj-tip">{dogadjaj.tip.naziv}</span>
            </div>
            <div className="dogadjaj-info">
                <h3>{dogadjaj.naziv}</h3>
                <p>{new Date(dogadjaj.datumVreme).toLocaleString()}</p>
                <p>Mesto: {dogadjaj.mesto}</p>
                <p>Organizator: {dogadjaj.organizator}</p>
                <p>Kapacitet: {dogadjaj.kapacitet}</p>
                <button onClick={()=>onKupiClick(dogadjaj)}>Kupi ulaznice</button>
            </div>
        </div>
    );
}

export default DogadjajKartica;

