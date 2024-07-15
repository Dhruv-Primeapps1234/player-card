// import React, { createContext, useEffect, useState } from 'react';

// export const PlayerContext = createContext();

// const PlayerContextProvider = (props) => {
//     const [playerData, setPlayerData] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5000/players')
//             .then(response => response.json())
//             .then(data => setPlayerData(data));
//     }, []);

//     const addPlayer = (player) => {
//         const newPlayer = { ...player, initial: player.name.charAt(0) };
//         fetch('http://localhost:5000/players', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newPlayer)
//         })
//         .then(response => response.json())
//         .then(data => setPlayerData([...playerData, data]));
//     };

//     const updatePlayer = (player) => {
//         const updatedPlayer = { ...player, initial: player.name.charAt(0) };
//         fetch(`http://localhost:5000/players/${player.id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(updatedPlayer)
//         })
//         .then(response => response.json())
//         .then(data => {
//             const updatedPlayers = playerData.map(p => p.id === data.id ? data : p);
//             setPlayerData(updatedPlayers);
//         });
//     };

//     const providerProps = {
//         playerData,
//         addPlayer,
//         updatePlayer
//     };

//     return (
//         <PlayerContext.Provider value={providerProps}>
//             {props.children}
//         </PlayerContext.Provider>
//     );
// };

// export default PlayerContextProvider;

// ##########################################################
// using local file 

import React, { createContext, useEffect, useState } from 'react';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        // Load data from localStorage or fallback to initial data from data.json
        const localData = localStorage.getItem('players');
        console.log(localData);
        if (localData) {
            setPlayerData(JSON.parse(localData));
        } else {
            // Fetch initial data from public/data.json
            fetch('/data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setPlayerData(data);
                    localStorage.setItem('players', JSON.stringify(data));
                })
                .catch(error => console.error('Fetch error:', error));
        }
    }, []);

    const addPlayer = (player) => {
        const newPlayer = { ...player, id: Date.now(), initial: player.name.charAt(0) };
        const updatedPlayers = [...playerData, newPlayer];
        setPlayerData(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    const updatePlayer = (player) => {
        const updatedPlayer = { ...player, initial: player.name.charAt(0) };
        const updatedPlayers = playerData.map(p => p.id === player.id ? updatedPlayer : p);
        setPlayerData(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    const providerProps = {
        playerData,
        addPlayer,
        updatePlayer
    };

    return (
        <PlayerContext.Provider value={providerProps}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
