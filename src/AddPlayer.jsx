import React, { useState, useEffect } from 'react';
import './styles/addPlayer.css'

const AddPlayer = ({ onAddPlayer, type, editPlayerDetails }) => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (type === 'EDIT') {
            setName(editPlayerDetails.name);
            setCountry(editPlayerDetails.country);
            setRole(editPlayerDetails.role);
        }
    }, [type, editPlayerDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const player = {
            id: type === 'EDIT' ? editPlayerDetails.id : undefined,
            name,
            country,
            role
        };
        onAddPlayer(player);
        setName('');
        setCountry('');
        setRole('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{type === 'ADD' ? 'Add New Cricket Player' : 'Edit Cricket Player'}</h1>
            <p>Fill out the form to {type === 'ADD' ? 'add a new player to the list.' : 'edit the player details.'}</p>
            <div className="add-player-form">
                <div className="row">
                    <div className="col-6 form_groups">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="col-6 form_groups">
                        <label>Country</label>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>
                    <div className="col-6 form_groups">
                        <label>Position</label>
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
                    </div>
                </div>
                <div className="add_update_btn">
                    <button className="add-update-player-button" type="submit">{type === 'ADD' ? 'Add Player' : 'Update Player'}</button>
                </div>
            </div>
        </form>
    );
};

export default AddPlayer;
