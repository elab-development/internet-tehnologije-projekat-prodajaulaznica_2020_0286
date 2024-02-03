import React from 'react';

const RedTabele = ({ dogadjaj, obrisiDogadjaj, openModalForUpdate }) => {
    const popunjenost = (dogadjaj.kapacitet - dogadjaj.br_mesta) / dogadjaj.kapacitet * 100;
    return (
        <tr>
            <td>{dogadjaj.naziv}</td>
            <td>{new Date(dogadjaj.datumVreme).toLocaleString()}</td>
            <td>{dogadjaj.mesto}</td> 
            <td>{dogadjaj.organizator}</td>
            <td>{dogadjaj.kapacitet}</td>
            <td>{dogadjaj.br_mesta}</td>
            <td>{popunjenost.toFixed(2)}%</td>
            <td>
                <button onClick={() => obrisiDogadjaj(dogadjaj.id)}>Obriši</button>
            </td>
            <td>
                <button onClick={() => openModalForUpdate(dogadjaj)}>Ažuriraj</button>
            </td>
        </tr>
    );
}

export default RedTabele;
