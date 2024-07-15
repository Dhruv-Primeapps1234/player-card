import React from 'react'
import "./styles/playerCard.css"
const PlayerCard = (props) => {

    const clickHandle = (player) => {
        props.onClickEvent(player)
    }
    return (
        <div className="player-card col-6 col-lg-2" onClick={() => clickHandle(props.player)}>
            <div className="player-initial">{props.player.name.split(" ")[0][0]}</div>
            <h2>{props.player.name}</h2>
            <p>{props.player.country}</p>
            <p>{props.player.role}</p>
        </div>
    )
}

export default PlayerCard