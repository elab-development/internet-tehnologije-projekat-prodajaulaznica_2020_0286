import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RedTabele from './RedTabele';
import './TabelaDogadjaja.css';
const TabelaDogadjaja = () => {
    const [dogadjaji, setDogadjaji] = useState([]);

    useEffect(() => {
        const fetchDogadjaji = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/dogadjaji');
                setDogadjaji(response.data.data);
            } catch (error) {
                console.error('Došlo je do greške pri dobavljanju događaja', error);
            }
        };

        fetchDogadjaji();
    }, []);
    const obrisiDogadjaj = async (id) => {
        try {
            const token = localStorage.getItem('authToken');  
            await axios.delete(`http://127.0.0.1:8000/api/dogadjaji/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(id)
            setDogadjaji(prevDogadjaji => prevDogadjaji.filter(d => d.id !== id));
        } catch (error) {
            console.error('Došlo je do greške pri brisanju događaja', error);
        }
    };
    return (
        <>
             
            <table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Datum i Vreme</th>
                    <th>Mesto</th>
                    <th>Tip</th>
                    <th>Organizator</th>
                    <th>Kapacitet</th>
                    <th>Obrisi</th>
                </tr>
            </thead>
            <tbody>
                {dogadjaji.map(dogadjaj => (
                        <RedTabele key={dogadjaj.id} dogadjaj={dogadjaj} obrisiDogadjaj={obrisiDogadjaj} />
                    ))}
            </tbody>
            </table>
        </>
    );
}

export default TabelaDogadjaja;
