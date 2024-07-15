import React, { useContext, useState } from 'react';
import { PlayerContext } from './playerContextProvider.js';
import PlayerCard from './PlayerCard';
import AddPlayer from './AddPlayer';
import "./styles/playerList.css";

const PlayerDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [typeOfEvent, setEvent] = useState("ADD");
    const [editPlayerDetails, setEditPlayer] = useState({});

    const { playerData, addPlayer, updatePlayer } = useContext(PlayerContext);

    const handlePlayerCardClick = (player) => {
        setEvent("EDIT");
        setShowForm(true);
        setEditPlayer(player);
    };

    const handleAddPlayer = (player) => {
        if (typeOfEvent === "ADD") {
            addPlayer(player);
        } else {
            updatePlayer(player);
        }
        setShowForm(false);
        setEvent("ADD");
        setEditPlayer({});
    };
    const handleBackClick = () => {
        setShowForm(false);
        setEvent("ADD");
        setEditPlayer({});
    };

    return (
        <div className="player-list container">
            {!showForm ? (
                <div className="d-flex justify-content-between home">
                    <div>
                        <h1>Cricket Player Listing</h1>
                        <p className="explore">Explore the top cricket players from around the world.</p>
                    </div>
                    <button className="add-player-button" onClick={() => setShowForm(true)}>Add New Player</button>
                </div>
            ) : (
                <div className="d-flex justify-content-between home">
                    <button className="add-player-button"  onClick={handleBackClick}>Back</button>
                </div>
            )}
            {!showForm && (
                <div className="row justify-content-center">
                    {playerData.map(player => (
                        <PlayerCard onClickEvent={handlePlayerCardClick} key={player.id} player={player} />
                    ))}
                </div>
            )}
            {showForm && (
                <AddPlayer
                    onAddPlayer={handleAddPlayer}
                    type={typeOfEvent}
                    editPlayerDetails={editPlayerDetails}
                />
            )}
        </div>
    );
};

export default PlayerDashboard;
