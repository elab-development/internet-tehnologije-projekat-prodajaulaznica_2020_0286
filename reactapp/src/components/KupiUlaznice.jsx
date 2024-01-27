import React, { useState } from 'react';
import useDogadjaji from './useDogadjaji';  
import DogadjajKartica from './DogadjajKartica';
import './KupiUlaznice.css';  
import Modal from './Modal';

const KupiUlaznice = () => {
    const { dogadjaji, loading, error } = useDogadjaji('http://127.0.0.1:8000/api/dogadjaji');
    const [selectedDogadjaj, setSelectedDogadjaj] = useState(null);
    const handleKupiClick = (id) => {
        setSelectedDogadjaj(id);
        console.log(id)
        localStorage.setItem("dogadjaj_id",id);
    };
    if (loading) return <p>Učitavanje događaja...</p>;
    if (error) return <p>Došlo je do greške: {error.message}</p>;
    console.log(dogadjaji)
    return (
        <div className="kupi-ulaznice-container">
            {dogadjaji.map(dogadjaj => (
                 <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} onKupiClick={handleKupiClick} />
            ))}
              {selectedDogadjaj && <Modal dogadjaj={selectedDogadjaj} onClose={() => setSelectedDogadjaj(null)} />}
        </div>
    );
}

export default KupiUlaznice;
