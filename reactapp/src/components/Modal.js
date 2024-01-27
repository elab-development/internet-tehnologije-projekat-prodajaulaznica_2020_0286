import axios from "axios";
import React, { useState, useEffect } from 'react';
import './Modal.css';
const Modal = ({ dogadjaj, onClose }) => {
    const [korisnikId, setKorisnikId] = useState(""); 
    const [tipoviUlaznica, setTipoviUlaznica] = useState([]);  
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
    
    console.log(dogadjaj)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            dogadjaj: dogadjaj.id,
            korisnik: korisnikId,  
            tip: event.target.tip.value,
            datumKupovine: event.target.datumKupovine.value,
            cena: event.target.cena.value,
        };

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
                <select id="tip" name="tip" required>
                    {tipoviUlaznica.map(tip => (
                        <option key={tip.id} value={tip.id}>{tip.nazivTipaUlaznice}</option>
                    ))}
                </select>

                <label htmlFor="datumKupovine">Datum Kupovine:</label>
                <input type="date" id="datumKupovine" name="datumKupovine" required />

                <label htmlFor="cena">Cena:</label>
                <input type="number" id="cena" name="cena" min="1" required />

                <button type="submit">Kupi</button>
            </form></div>
            
        </div>
    );
};

export default Modal;
