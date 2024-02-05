import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const MojeUlaznice = () => {
  const [ulaznice, setUlaznice] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
  
  useEffect(() => { 
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get('http://127.0.0.1:8000/api/moje-ulaznice', axiosConfig)
      .then(response => {
        setUlaznice(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška pri učitavanju ulaznica:', error);
        setLoading(false);
      });
  }, []);

  const handlePrintClick = (ulaznica) => {
    const doc = new jsPDF();

    // Dodaj header
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Detalji o Ulaznici', 105, 20, null, null, 'center');

    // Linija ispod headera
    doc.setDrawColor(0);
    doc.setFillColor(204, 204, 204);
    doc.rect(0, 25, 210, 0.5, 'F');

    // Naziv događaja
    doc.setFontSize(12);
    doc.setTextColor(40);

    doc.text('Naziv Dogadjaja:', 20, 40);
    doc.text(ulaznica.dogadjaj.naziv, 70, 40);

    // Tip ulaznice
    doc.text('Tip Ulaznice:', 20, 50);
    doc.text(ulaznica.tip.naziv, 70, 50);

    // Datum kupovine
    doc.text('Datum Kupovine:', 20, 60);
    doc.text(ulaznica.datumKupovine, 70, 60);

    // Osnovna cena
    doc.text('Osnovna cena:', 20, 70);
    doc.text(`${ulaznica.dogadjaj.cena} RSD`, 70, 70);

    // Količina
    doc.text('Kolicina:', 20, 80);
    doc.text(`${ulaznica.kolicina}`, 70, 80);

    // Ukupna cena
    doc.text('Ukupna cena:', 20, 90);
    doc.text(`${ulaznica.cena} RSD`, 70, 90);

    // Dodaj footer
    const stranica = 'Stranica 1 od 1';
    doc.setFontSize(10);
    doc.text(stranica, 105, 280, null, null, 'center');

    // Sačuvaj PDF fajl
    doc.save(`kupovina_ulaznice_${ulaznica.id}.pdf`);
};

  

  if (loading) {
    return <p>Učitavanje ulaznica...</p>;
  }

  return (
    <div>
      <h1>Sve Ulaznice</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv Događaja</th>
            <th>Tip Ulaznice</th>
            <th>Datum Kupovine</th>
            <th>Cena</th>
            <th>Štampaj</th>
          </tr>
        </thead>
        <tbody>
          {ulaznice.map(ulaznica => (
            <tr key={ulaznica.id}>
              <td>{ulaznica.id}</td>
              <td>{ulaznica.dogadjaj.naziv}</td>
              <td>{ulaznica.tip.naziv}</td>
              <td>{ulaznica.datumKupovine}</td>
              <td>{ulaznica.cena}</td>
              <td>
                <button onClick={() => handlePrintClick(ulaznica)}>Štampaj</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MojeUlaznice;
