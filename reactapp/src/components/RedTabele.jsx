import React from 'react';

const RedTabele = ({ dogadjaj, obrisiDogadjaj }) => {
    return (
        <tr>
            <td>{dogadjaj.naziv}</td>
            <td>{new Date(dogadjaj.datumVreme).toLocaleString()}</td>
            <td>{dogadjaj.mesto}</td> 
            <td>{dogadjaj.organizator}</td>
            <td>{dogadjaj.kapacitet}</td>
            <td>
                <button onClick={() => obrisiDogadjaj(dogadjaj.id)}>Obriši</button>
            </td>
        </tr>
    );
}

export default RedTabele;
