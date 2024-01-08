import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RedTabele from './RedTabele';
import './TabelaDogadjaja.css';
import useDogadjaji from './useDogadjaji';
const TabelaDogadjaja = () => {
    const { dogadjaji, loading, error, setDogadjaji } = useDogadjaji('http://127.0.0.1:8000/api/dogadjaji');
    const [prikaziModal, setPrikaziModal] = useState(false);
    const [noviDogadjaj, setNoviDogadjaj] = useState({
        naziv: '',
        datumVreme: '',
        mesto: '', 
        organizator: '',
        kapacitet: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoviDogadjaj(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const dodajDogadjaj = () => {
        setDogadjaji(prevDogadjaji => [...prevDogadjaji, { ...noviDogadjaj, id: Date.now() }]);
        setPrikaziModal(false); // Sakrij modal nakon dodavanja
    };
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
    const obrisiDogadjaj = (id) => {
        setDogadjaji(prevDogadjaji => prevDogadjaji.filter(d => d.id !== id));
    };
    if (loading) return <p>Učitavanje događaja...</p>;
    if (error) return <p>Došlo je do greške: {error.message}</p>;
    return (
        <>
              <button onClick={() => setPrikaziModal(true)}>Dodaj Novi Događaj</button>
              {prikaziModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setPrikaziModal(false)}>&times;</span>
                        <form onSubmit={e => { e.preventDefault(); dodajDogadjaj(); }}>
                            <input
                                type="text"
                                name="naziv"
                                value={noviDogadjaj.naziv}
                                onChange={handleInputChange}
                                placeholder="Naziv događaja"
                                required
                            />
                            <input
                                type="datetime-local"
                                name="datumVreme"
                                value={noviDogadjaj.datumVreme}
                                onChange={handleInputChange}
                                placeholder="Datum i vreme"
                                required
                            />
                            <input
                                type="text"
                                name="mesto"
                                value={noviDogadjaj.mesto}
                                onChange={handleInputChange}
                                placeholder="Mesto"
                                required
                            /> 
                            <input
                                type="text"
                                name="organizator"
                                value={noviDogadjaj.organizator}
                                onChange={handleInputChange}
                                placeholder="Organizator"
                                required
                            />
                            <input
                                type="number"
                                name="kapacitet"
                                value={noviDogadjaj.kapacitet}
                                onChange={handleInputChange}
                                placeholder="Kapacitet"
                                min="1"
                                required
                            />
                            <button type="submit">Sačuvaj Događaj</button>
                        </form>
                    </div>
                </div>
            )}
            <table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Datum i Vreme</th>
                    <th>Mesto</th> 
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
