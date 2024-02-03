import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart, ArcElement } from 'chart.js';


import { Doughnut } from 'react-chartjs-2';
Chart.register(ArcElement);
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

    // Priprema podataka za dijagram
    const data = {
        labels: Object.keys(dogadjaj.statistika_ulaznica),
        datasets: [
            {
                label: 'Prodaja ulaznica po tipu',
                data: Object.values(dogadjaj.statistika_ulaznica),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    console.log(data);
    return (
        <div className="detalji-container">
            <h1>{dogadjaj.naziv}</h1>
            <p>Datum i vreme: {new Date(dogadjaj.datumVreme).toLocaleString()}</p>
            <p>Mesto: {dogadjaj.mesto}</p>
            <p>Organizator: {dogadjaj.organizator}</p>
            <p>Kapacitet: {dogadjaj.kapacitet}</p>
            <p>Broj slobodnih mesta: {brojSlobodnihMesta}</p>
            <p>Popunjenost: {popunjenost.toFixed(2)}%</p>
            <Doughnut data={data} key={dogadjaj.id} />
        </div>
    );
};

export default Detalji;
