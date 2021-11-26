import React from 'react';

const PlayerIcon = (props) =>{    
    var playerClass="player-position-goalkeeper";
    switch(props.position){
        case "GK":
            playerClass="player-postion-goalkeeper"
            break;
            default:
                playerClass="";
                break;
    }
    return(
        <div className={playerClass}>
            P
        </div>
    )
}

export default PlayerIcon;