import React, { useContext, useState } from 'react';

import { SocketContext } from "../contexts/SocketContext";

export const BandAdd = () => {

    const { socket } = useContext(SocketContext);
    const [ value, setValue ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if( value.trim().length > 0 ) {
            socket.emit('add-band', { name: value });
            setValue('');
        }

    }

    const handleInputChange = (e) => {
        const name = e.target.value; 
        setValue(name);
    }

    return (
        <>
            <h3>Add band</h3>  
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control"
                        value={ value }
                        onChange={ handleInputChange }/>
                </div>
            </form>
        </>
    )
}
