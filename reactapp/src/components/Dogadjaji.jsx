import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogadjajKartica from './DogadjajKartica';
import './Dogadjaji.css';
import Kartica from './Kartica';
import { MdLastPage ,MdFirstPage} from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
const Dogadjaji = () => {
    const [dogadjaji, setDogadjaji] = useState([]);
    const [dogadjaji2, setDogadjaji2] = useState([]);
    const [izabranaKategorija, setIzabranaKategorija] = useState('');
    const [trenutnaStranica, setTrenutnaStranica] = useState(1);
    const dogadjajiPoStranici = 10;
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
    const handleKategorijaChange = (e) => {
        setIzabranaKategorija(e.target.value);
    };
    const filtriraniDogadjaji = dogadjaji.filter(dogadjaj =>
        dogadjaj.naziv.toLowerCase().includes(pretraga.toLowerCase())
    );

    const filtriraniDogadjaji2 = dogadjaji2.filter(dogadjaj =>
        dogadjaj.name.toLowerCase().includes(pretraga.toLowerCase())
    );
    const filtriraniDogadjaji22 = filtriraniDogadjaji2.filter(dogadjaj =>
        izabranaKategorija === '' || (dogadjaj.classifications[0].segment.name === izabranaKategorija)
    );
 
  
    useEffect(() => {
        const fetchRandomEvents = async () => {
            try {
                const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
                    params: {
                        apikey: 'rQaLInSZHng8AiA3h8qSt41RdHFKBmd3',
                        size: dogadjajiPoStranici,
                        page: trenutnaStranica,
                    }
                });
                setDogadjaji2(response.data._embedded.events);
                console.log(response.data._embedded.events)
            } catch (error) {
                console.error('Došlo je do greške prilikom dobavljanja događaja', error);
            }
        };
    
        fetchRandomEvents();
    }, [trenutnaStranica]);
    const prethodnaStranica = () => {
        setTrenutnaStranica(prev => (prev > 1 ? prev - 1 : prev));
    };
    
    const sledecaStranica = () => {
        setTrenutnaStranica(prev => prev + 1);
    };
    
    const prvaStranica = () => {
        setTrenutnaStranica(1);
    };
    
    const poslednjaStranica = () => {
        setTrenutnaStranica(25); 
    };
    
    
    
    return (
        <div style={{backgroundColor:"#95A78D", display: 'flex'}}> 
            <div className="filteri">
            <label>
                    <input
                        type="radio"
                        value=""
                        checked={izabranaKategorija === ''}
                        onChange={handleKategorijaChange}
                    /> Svi
                </label>
                <label>
                    <input
                        type="radio"
                        value="Sports"
                        checked={izabranaKategorija === 'Sports'}
                        onChange={handleKategorijaChange}
                    /> Sports
                </label>
                <label>
                    <input
                        type="radio"
                        value="Music"
                        checked={izabranaKategorija === 'Music'}
                        onChange={handleKategorijaChange}
                    /> Music
                </label>
                <label>
                    <input
                        type="radio"
                        value="Miscellaneous"
                        checked={izabranaKategorija === 'Miscellaneous'}
                        onChange={handleKategorijaChange}
                    /> Miscellaneous
                </label>
            </div>
            <div style={{flexGrow: 1}}>
                <input
                    type="text"
                    placeholder="Pretraži događaje"
                    value={pretraga}
                    onChange={handlePretragaChange}
                    className="pretraga-input"
                />
              
                <div className="paginacija">
                    <button onClick={prvaStranica}><MdFirstPage /></button>
                    <button onClick={prethodnaStranica}><MdNavigateBefore /></button>
                    <span>Stranica {trenutnaStranica}</span>
                    <button onClick={sledecaStranica}><MdNavigateNext /></button>
                    <button onClick={poslednjaStranica}><MdLastPage /></button>
                </div>  
                <div className="dogadjaji-wrapper">
                     {/* <div className="dogadjaji-container">
                        {filtriraniDogadjaji.map(dogadjaj => (
                            <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
                        ))}
                    </div>   */}

                    <h2>Spoljni Događaji</h2>
                    <div className="dogadjaji-container">
                        {filtriraniDogadjaji22.map(dogadjaj => (
                            <Kartica dogadjaj={dogadjaj}></Kartica>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dogadjaji;
