import axios from "axios";
import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ dogadjaj, onClose }) => {
    const [korisnikId, setKorisnikId] = useState(""); 
    const [tipoviUlaznica, setTipoviUlaznica] = useState([]);  
    const [datumKupovine, setDatumKupovine] = useState(""); 
    const [kolicina, setKolicinaKarata] = useState(1); 
    const [selectedTipUlaznice, setSelectedTipUlaznice] = useState("1"); 
    const [cena, setCena] = useState(0); 

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchTipovi = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tipoviUlaznica', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTipoviUlaznica(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Došlo je do greške pri dobavljanju događaja', error);
            }
        };
    
        fetchTipovi();
    }, []);

    // Postavite datum kupovine na trenutni datum prilikom montiranja komponente
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDatumKupovine(formattedDate);
    }, []);

    // Izračunaj cenu na osnovu odabrane ulaznice, cene događaja i količine
    useEffect(() => {
        const dogadjajCena = parseFloat(localStorage.getItem("dogadjaj_cena"));
        let popust = 1;
        
        if (selectedTipUlaznice === "1") {
            // Ako je odabrana standardna ulaznica, nema popusta
            popust = 1.0;
        } else if (selectedTipUlaznice === "2") {
            // Ako je odabrana Premium ulaznica, primeni popust
            popust = 1.5;  //50% skuplje
        }else if (selectedTipUlaznice === "3") {
            // Ako je odabrana VIP ulaznica, primeni popust
            popust = 2.0;  //duplo skuplje
        }
        else if (selectedTipUlaznice === "4") {
            // Ako je odabrana grupna ulaznica, primeni popust
            if (kolicina < 5) {
                alert("Grupna ulaznica zahteva da količina bude 5 ili više.");
                popust = 1.0;
            }else{
                popust = 0.8;  //20% popusta
            }
           
        }
        else if (selectedTipUlaznice === "5") {
            // Ako je odabrana Student ulaznica, primeni popust
            popust = 0.9;  //10% popusta
        }
        
        const novaCena = dogadjajCena * popust * kolicina;
        setCena(novaCena);
    }, [selectedTipUlaznice, kolicina]);

    const handleTipChange = (event) => {
        setSelectedTipUlaznice(event.target.value);
    };

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        const formData = {
            dogadjaj: localStorage.getItem("dogadjaj_id"), 
            tip: selectedTipUlaznice,  
            datumKupovine: datumKupovine,  
            cena: cena,  
            kolicina: kolicina
        };
        console.log(formData)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ulaznice', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            onClose();  
        } catch (error) {
            console.error('Error creating ticket', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close"  onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>

                    <h2 style={{color:"black"}}>Kupovina Ulaznice</h2>
                    <p>{dogadjaj.naziv}</p>

                   
                    <label htmlFor="tip">Tip Ulaznice:</label>
                    <select id="tip" name="tip" value={selectedTipUlaznice} onChange={handleTipChange} required>
                        {tipoviUlaznica.map(tip => (
                            <option key={tip.id} value={tip.id}>{tip.nazivTipaUlaznice}</option>
                        ))}
                    </select>

                    <label htmlFor="datumKupovine">Datum Kupovine:</label>
                    <input type="date" id="datumKupovine" name="datumKupovine" required value={datumKupovine} readOnly />

                    <label htmlFor="kolicina">Količina Karata:</label>
                    <input type="number" id="kolicina" name="kolicina" min="1" value={kolicina} onChange={(e) => setKolicinaKarata(e.target.value)} required />

                    <label htmlFor="cena">Cena:</label>
                    <input type="number" id="cena" name="cena" min="1" value={cena} readOnly />

                    <button type="submit">Kupi</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
