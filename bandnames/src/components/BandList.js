
import React, { useState, useEffect, useContext } from 'react';

import { SocketContext } from "../contexts/SocketContext";

export const BandList = () => {

    const { socket } = useContext(SocketContext);
    const [ bands, setBands ] = useState([]);

    useEffect(() => {
        socket.on('current-bands', (data) => {
            setBands(data);
        });
        return () => socket.off('current-bands');
    }, [ socket ]);

    const handleInputRowChange = (e, id) => {
        const newName = e.target.value;
        setBands( bands => bands.map( band => {
            if( band.id === id) {
                band.name = newName;
            }
            return band;
        }));
    }

    const onLostFocus = (id, name) => {        
        socket.emit('update-band', { id, name });
    }

    const voteBand = (id) => {
        console.log(id);
        socket.emit('vote-band', id);
    }

    const deleteBand = (id) => {
        socket.emit('delete-band', id);
    }

    const createRows = () => {

        return (
            bands.map( band => (    
                <tr key={band.id}>
                    <th scope="row">
                        <button 
                            className="btn btn-primary" 
                            onClick={ () => voteBand(band.id) }
                        >
                            +1
                        </button>
                    </th>
                    <td>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={band.name} 
                                onChange={ (event) => handleInputRowChange(event, band.id) } 
                                onBlur={ () => onLostFocus(band.id, band.name) }/>
                        </div>
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick={ () => deleteBand(band.id) }
                        >
                            Trash
                        </button>
                    </td>
                </tr>
            ))
        );
    }

    return (
        <>
            <h3>Current bands</h3>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Votes</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </table>
        </>
    )
}
