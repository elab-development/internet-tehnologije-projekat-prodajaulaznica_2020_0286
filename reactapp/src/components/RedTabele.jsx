import React from 'react';

const RedTabele = ({ dogadjaj }) => {
    return (
        <tr>
            <td>{dogadjaj.naziv}</td>
            <td>{new Date(dogadjaj.datumVreme).toLocaleString()}</td>
            <td>{dogadjaj.mesto}</td>
            <td>{dogadjaj.tip.naziv}</td>
            <td>{dogadjaj.organizator}</td>
            <td>{dogadjaj.kapacitet}</td>
        </tr>
    );
}

export default RedTabele;
