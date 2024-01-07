import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogadjajKartica from './DogadjajKartica';
import './Dogadjaji.css';

const Dogadjaji = () => {
    const [dogadjaji, setDogadjaji] = useState([]);

    useEffect(() => {
        const fetchDogadjaji = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/dogadjaji');
                setDogadjaji(response.data.data);
                console.log(response)
            } catch (error) {
                console.error('Došlo je do greške pri dobavljanju događaja', error);
            }
        };

        fetchDogadjaji();
    }, []);

    return (
        <div className="dogadjaji-container">
            {dogadjaji.map(dogadjaj => (
                <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
            ))}
        </div>
    );
}

export default Dogadjaji;
