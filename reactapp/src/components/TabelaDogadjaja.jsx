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

    return (
        <table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Datum i Vreme</th>
                    <th>Mesto</th>
                    <th>Tip</th>
                    <th>Organizator</th>
                    <th>Kapacitet</th>
                </tr>
            </thead>
            <tbody>
                {dogadjaji.map(dogadjaj => <RedTabele key={dogadjaj.id} dogadjaj={dogadjaj} />)}
            </tbody>
        </table>
    );
}

export default TabelaDogadjaja;
