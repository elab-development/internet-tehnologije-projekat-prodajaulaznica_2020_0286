import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogadjajKartica from './DogadjajKartica';
import './Dogadjaji.css';
import Kartica from './Kartica';

const Dogadjaji = () => {
    const [dogadjaji, setDogadjaji] = useState([]);
    const [dogadjaji2, setDogadjaji2] = useState([]);

    const [pretraga, setPretraga] = useState('');
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

    const handlePretragaChange = (e) => {
        setPretraga(e.target.value);
    };

    const filtriraniDogadjaji = dogadjaji.filter(dogadjaj =>
        dogadjaj.naziv.toLowerCase().includes(pretraga.toLowerCase())
    );

    const filtriraniDogadjaji2 = dogadjaji2.filter(dogadjaj =>
        dogadjaj.name.toLowerCase().includes(pretraga.toLowerCase())
    );
    
    useEffect(() => {
        const fetchRandomEvents = async () => {
            try {
                const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
                    params: {
                        apikey: 'rQaLInSZHng8AiA3h8qSt41RdHFKBmd3',
                        size: 200,
                         
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
        <div style={{backgroundColor:"#95A78D"}}> 
        <input
                type="text"
                placeholder="Pretraži događaje"
                value={pretraga}
                onChange={handlePretragaChange}
                className="pretraga-input"
            />
        <h2>Nasi Dogadjaji</h2>       
        
         <div className="dogadjaji-wrapper">
            <div className="dogadjaji-container">
               
                {filtriraniDogadjaji.map(dogadjaj => (
                    <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
                ))}
            </div>
            <h2>Spoljni Dogadjaji</h2>
            <div className="dogadjaji-container">
              
                {filtriraniDogadjaji2.map(dogadjaj => (
                    <Kartica dogadjaj={dogadjaj}></Kartica>
                    
                ))}
            </div>
        </div>
        </div>

    );
}

export default Dogadjaji;
