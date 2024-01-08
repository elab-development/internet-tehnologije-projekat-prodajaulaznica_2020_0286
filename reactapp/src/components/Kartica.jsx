import React from 'react';
import './Kartica.css';

const Kartica = ({ dogadjaj }) => {
    return (
        <div className="dogadjaj-kartica">
            <div className="dogadjaj-slika-container">
                {dogadjaj.images && dogadjaj.images.length > 0 && (
                    <img src={dogadjaj.images[0].url} alt={dogadjaj.name} className="dogadjaj-slika" />
                )}
                {dogadjaj.classifications && (
                    <span className="dogadjaj-tip">{dogadjaj.classifications[0].segment.name}</span>
                )}
            </div>
            <div className="dogadjaj-info">
                <h3>{dogadjaj.name}</h3>
                <a href={dogadjaj.url} target="_blank" rel="noopener noreferrer">Više informacija</a>
            </div>
        </div>
    );
}

export default Kartica;
