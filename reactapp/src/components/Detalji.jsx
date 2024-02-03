import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detalji = () => {
    const { id } = useParams();
    const [dogadjaj, setDogadjaj] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/dogadjaji/${id}`);
                setDogadjaj(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    if (!dogadjaj) {
        return <div>Loading...</div>;
    }

    // Izračunaj broj slobodnih mesta
    const brojSlobodnihMesta = dogadjaj.kapacitet - dogadjaj.br_mesta;

    // Izračunaj popunjenost kao procenat
    const popunjenost = (brojSlobodnihMesta / dogadjaj.kapacitet) * 100;

    return (
        <div className="detalji-container">
            <h1>{dogadjaj.naziv}</h1>
            <p>Datum i vreme: {new Date(dogadjaj.datumVreme).toLocaleString()}</p>
            <p>Mesto: {dogadjaj.mesto}</p>
            <p>Organizator: {dogadjaj.organizator}</p>
            <p>Kapacitet: {dogadjaj.kapacitet}</p>
            <p>Broj slobodnih mesta: {brojSlobodnihMesta}</p>
            <p>Popunjenost: {popunjenost.toFixed(2)}%</p>
        </div>
    );
};

export default Detalji;
