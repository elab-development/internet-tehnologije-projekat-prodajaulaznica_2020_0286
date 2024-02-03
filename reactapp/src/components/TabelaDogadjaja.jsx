import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RedTabele from './RedTabele';
import './TabelaDogadjaja.css';
import useDogadjaji from './useDogadjaji';
import UnauthorizedPage from './UnauthorizedPage ';

const TabelaDogadjaja = () => {
    const { dogadjaji, loading, error,setDogadjaji} = useDogadjaji('http://127.0.0.1:8000/api/dogadjaji');
    const [prikaziModal, setPrikaziModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [pretragaKriterijum, setPretragaKriterijum] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [noviDogadjaj, setNoviDogadjaj] = useState({
        naziv: '',
        datumVreme: '',
        mesto: '',
        organizator: '',
        kapacitet: '',
        cena: '',
        tip: 6 // Ostalo
    });


    const handlePretragaInputChange = (e) => {
        setPretragaKriterijum(e.target.value);
    };

    const filtriraniDogadjaji = dogadjaji.filter(dogadjaj =>
        dogadjaj.naziv.toLowerCase().includes(pretragaKriterijum.toLowerCase()) ||
        dogadjaj.mesto.toLowerCase().includes(pretragaKriterijum.toLowerCase()) ||
        dogadjaj.organizator.toLowerCase().includes(pretragaKriterijum.toLowerCase())
        
    );
    const sortirajDogadjaje = (direction) => {
        setSortDirection(direction);
        setDogadjaji(prevDogadjaji => {
            return [...prevDogadjaji].sort((a, b) => {
                
                const popunjenostA = (a.br_mesta / a.kapacitet) || 0;
                const popunjenostB = (b.br_mesta / b.kapacitet) || 0;

                if (direction === "rastuce") {
                    return popunjenostA - popunjenostB;
                } else if (direction === "opadajuce") {
                    return popunjenostB - popunjenostA;
                }
            });
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoviDogadjaj(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const openModalForAdd = () => {
        setIsUpdating(false);
        setNoviDogadjaj({ naziv: '', datumVreme: '', mesto: '', organizator: '', kapacitet: '' });
        setPrikaziModal(true);
    };

    const openModalForUpdate = (dogadjaj) => {
        setIsUpdating(true);
        setNoviDogadjaj(dogadjaj);
        setPrikaziModal(true);
    };

    const saveDogadjaj = () => {
        noviDogadjaj.tip=6;
        const token = localStorage.getItem('authToken');  
    
        if (isUpdating) {
            axios.put(`http://127.0.0.1:8000/api/dogadjaji/${noviDogadjaj.id}`, noviDogadjaj, {
                headers: {
                    Authorization: `Bearer ${token}`  
                }
            })
                .then(response => {
                    setDogadjaji(prevDogadjaji => prevDogadjaji.map(d => d.id === noviDogadjaj.id ? noviDogadjaj : d));
                    setPrikaziModal(false);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/dogadjaji', { ...noviDogadjaj, id: Date.now() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setDogadjaji(prevDogadjaji => [...prevDogadjaji, { ...noviDogadjaj, id: Date.now() }]);
                    setPrikaziModal(false);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    };
    
 
    const obrisiDogadjaj = (id) => {
        setDogadjaji(prevDogadjaji => prevDogadjaji.filter(d => d.id !== id));
    };
    const userRole = localStorage.getItem('uloga');

    // Proveri ulogu i prikaži poruku ako je korisnik ili nema uloge
    if (userRole === 'korisnik' || !userRole) {
        return <UnauthorizedPage></UnauthorizedPage>;
    }
    if (loading) return <p>Učitavanje događaja...</p>;
    if (error) return <p>Došlo je do greške: {error.message}</p>;
 
    return (
        <>
            <button onClick={openModalForAdd}>Dodaj Novi Događaj</button>
            {prikaziModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setPrikaziModal(false)}>&times;</span>
                        <form onSubmit={e => { e.preventDefault(); saveDogadjaj(); }}>
                            <input type="text" name="naziv" value={noviDogadjaj.naziv} onChange={handleInputChange} placeholder="Naziv događaja" required />
                            <input type="datetime-local" name="datumVreme" value={noviDogadjaj.datumVreme} onChange={handleInputChange} placeholder="Datum i vreme" required />
                            <input type="text" name="mesto" value={noviDogadjaj.mesto} onChange={handleInputChange} placeholder="Mesto" required /> 
                            <input type="text" name="organizator" value={noviDogadjaj.organizator} onChange={handleInputChange} placeholder="Organizator" required />
                            <input type="number" name="kapacitet" value={noviDogadjaj.kapacitet} onChange={handleInputChange} placeholder="Kapacitet" min="1" required />
                            <input type="number" name="cena" value={noviDogadjaj.cena} onChange={handleInputChange} placeholder="Osnovna cena" min="1" required />
                           
                            <button type="submit">{isUpdating ? 'Ažuriraj Događaj' : 'Sačuvaj Događaj'}</button>
                        </form>
                    </div>
                </div>
            )}
            <div className="pretraga">
                <input
                    type="text"
                    placeholder="Unesite kriterijum za pretragu"
                    value={pretragaKriterijum}
                    onChange={handlePretragaInputChange}
                />
              
            </div>
            <div className="sortiranje">
                <button onClick={() => sortirajDogadjaje('rastuce')}>Sortiraj Rastuće</button>
                <button onClick={() => sortirajDogadjaje('opadajuce')}>Sortiraj Opadajuće</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Datum i Vreme</th>
                        <th>Mesto</th>
                        <th>Organizator</th>
                        <th>Kapacitet</th>
                        <th>Br. neprodatih karata</th>
                        <th>Popunjenost</th>
                        <th>Obrisi</th>
                        <th>Ažuriraj</th>
                    </tr>
                </thead>
                <tbody>
                    {filtriraniDogadjaji.map(dogadjaj => (
                        <RedTabele key={dogadjaj.id} dogadjaj={dogadjaj} obrisiDogadjaj={obrisiDogadjaj} openModalForUpdate={() => openModalForUpdate(dogadjaj)} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TabelaDogadjaja;
