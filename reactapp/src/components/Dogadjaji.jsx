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
                        size: 25,  
                        
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
        <div style={{backgroundColor:"#95A78D"}}> <h2>Nasi Dogadjaji</h2>        <div className="dogadjaji-wrapper">
            <div className="dogadjaji-container">
               
                {dogadjaji.map(dogadjaj => (
                    <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
                ))}
            </div>
            <h2>Spoljni Dogadjaji</h2>
            <div className="dogadjaji-container">
              
                {dogadjaji2.map(dogadjaj => (
                    <div key={dogadjaj.id} className="dogadjaj">
                        <h3>{dogadjaj.name}</h3>
                        <a href={dogadjaj.url} target="_blank" rel="noopener noreferrer">Više informacija</a>
                        {dogadjaj.images && dogadjaj.images.length > 0 && (
                            <img src={dogadjaj.images[0].url} alt={dogadjaj.name} />
                        )}
                    </div>
                ))}
            </div>
        </div>
        </div>

    );
}

export default Dogadjaji;
