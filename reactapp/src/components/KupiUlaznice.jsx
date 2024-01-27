import React from 'react';
import useDogadjaji from './useDogadjaji';  
import DogadjajKartica from './DogadjajKartica';
import './KupiUlaznice.css';  

const KupiUlaznice = () => {
    const { dogadjaji, loading, error } = useDogadjaji('http://127.0.0.1:8000/api/dogadjaji');

    if (loading) return <p>Učitavanje događaja...</p>;
    if (error) return <p>Došlo je do greške: {error.message}</p>;
    console.log(dogadjaji)
    return (
        <div className="kupi-ulaznice-container">
            {dogadjaji.map(dogadjaj => (
                <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
            ))}
        </div>
    );
}

export default KupiUlaznice;
