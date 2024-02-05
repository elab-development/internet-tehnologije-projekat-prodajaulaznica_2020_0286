import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            console.log(response.data.data)
            setLoading(false);
        })
        .catch(error => {
            console.error('Greška pri učitavanju ulaznica:', error);
            setLoading(false);
        });
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default  MojeUlaznice;
