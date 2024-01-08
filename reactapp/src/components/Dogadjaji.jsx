import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogadjajKartica from './DogadjajKartica';
import './Dogadjaji.css';

const Dogadjaji = () => {
    const [dogadjaji, setDogadjaji] = useState([]);
    const [dogadjaji2, setDogadjaji2] = useState([]);
    useEffect(() => { //izvlacimo dogadjaje iz nase baze
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

 
    
    useEffect(() => {
        const fetchRandomEvents = async () => {
            try {
                const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
                    params: {
                        apikey: 'rQaLInSZHng8AiA3h8qSt41RdHFKBmd3',
                        size: 5,  
                        
                    }
                });
                setDogadjaji2(response.data._embedded.events);
            } catch (error) {
                console.error('Došlo je do greške prilikom dobavljanja događaja', error);
            }
        };
    
        fetchRandomEvents();
    }, []);
    
    



    return (
        <div className="dogadjaji-container">
            {dogadjaji.map(dogadjaj => (
                <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
            ))}

            {dogadjaji2.map(dogadjaj => (
                <div key={dogadjaj.id} className="dogadjaj">
                    <h3>{dogadjaj.name.text}</h3>
                    <p>{dogadjaj.description.text}</p>
                   
                </div>
            ))}
        </div>
    );
}

export default Dogadjaji;
