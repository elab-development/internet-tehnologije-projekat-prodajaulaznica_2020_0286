import React, { useState } from 'react';
import useDogadjaji from './useDogadjaji';  
import DogadjajKartica from './DogadjajKartica';
import './KupiUlaznice.css';  
import Modal from './Modal';

const KupiUlaznice = () => {
    const { dogadjaji, loading, error } = useDogadjaji('http://127.0.0.1:8000/api/dogadjaji');
    const [selectedDogadjaj, setSelectedDogadjaj] = useState(null);
    const handleKupiClick = (dogadjaj) => {
        setSelectedDogadjaj(dogadjaj.id);
        console.log(dogadjaj.id)
        localStorage.setItem("dogadjaj_id",dogadjaj.id);
        localStorage.setItem("dogadjaj_cena",dogadjaj.cena);
    };
    function zatvoriModal(){
        setSelectedDogadjaj(null);

    }
    if (loading) return <p>Učitavanje događaja...</p>;
    if (error) return <p>Došlo je do greške: {error.message}</p>;
    console.log(dogadjaji)
    return (
        <div className="kupi-ulaznice-container">
            {dogadjaji.map(dogadjaj => (
                 <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} onKupiClick={handleKupiClick} />
            ))}
              {selectedDogadjaj && <Modal dogadjaj={selectedDogadjaj} onClose={zatvoriModal } />}
        </div>
    );
}

export default KupiUlaznice;
