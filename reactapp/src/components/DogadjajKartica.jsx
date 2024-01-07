import React from 'react';
import './DogadjajKartica.css';

const DogadjajKartica = ({ dogadjaj }) => {
    return (
        <div className="dogadjaj-kartica">
            <img src={dogadjaj.slika} alt={dogadjaj.naziv} className="dogadjaj-slika" />
            <div className="dogadjaj-info">
                <h3>{dogadjaj.naziv}</h3>
                <p>{new Date(dogadjaj.datumVreme).toLocaleString()}</p>
                <p>Mesto: {dogadjaj.mesto}</p>
                <p>Tip: {dogadjaj.tip.nazivTipaDogadjaja}</p>
                <p>Organizator: {dogadjaj.organizator}</p>
                <p>Kapacitet: {dogadjaj.kapacitet}</p>
            </div>
        </div>
    );
}

export default DogadjajKartica;
