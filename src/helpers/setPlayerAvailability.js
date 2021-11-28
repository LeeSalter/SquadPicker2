function setPlayerAvailability (state, player, actionType){
    let goalkeepers=state.selectedPlayers.filter(p=>p.position===1).length;
    let defenders=state.selectedPlayers.filter(p=>p.position===2).length;
    let midfielders=state.selectedPlayers.filter(p=>p.position===3).length;
    let forwards=state.selectedPlayers.filter(p=>p.position===4).length;

    switch(actionType){
        case "PLAYER_ADDED":
            switch(player.position){
                case 1:
                    if(goalkeepers>=state.selectedFormation.goalkeepers){
                        state.unselectedPlayers.map(p=> {
                            if(p.position===1){
                                p.availability="player-unavailable";
                            }})}
                    break;
                case 2:
                    if(defenders>=state.selectedFormation.defenders){
                        state.unselectedPlayers.map(p=> {
                            if(p.position===2){
                                p.availability="player-unavailable";
                            }})}
                    break;
                case 3:
                    if(midfielders>=state.selectedFormation.midfielders){
                        state.unselectedPlayers.map(p=> {
                            if(p.position===3){
                                p.availability="player-unavailable";
                            }})}
                    break;
                case 4:
                    if(forwards>=state.selectedFormation.forwards){
                        state.unselectedPlayers.map(p=> {
                            if(p.position===4){
                                p.availability="player-unavailable";
                            }})}
                    break;
                default:
                    break;                                
            }
            return state;
        case "PLAYER_REMOVED":
            let gks=state.selectedPlayers.filter(p=>p.position===1).length;
            let defs=state.selectedPlayers.filter(p=>p.position===2).length;
            let mids=state.selectedPlayers.filter(p=>p.position===3).length;
            let fwds=state.selectedPlayers.filter(p=>p.position===4).length;
    
            switch(player.position){
                case 1:
                    if(gks < state.selectedFormation.goalkeepers){
                        state.unselectedPlayers.filter(p=>p.position===1).map(p=>{p.availability="player-available"})
                    } else {
                        state.unselectedPlayers.filter(p=>p.position===1).map(p=>{p.availability="player-unavailable"})
                    }                                   
                    break;
                case 2:
                    if(defs < state.selectedFormation.defenders){
                        state.unselectedPlayers.filter(p=>p.position===2).map(p=>{p.availability="player-available"})
                    } else {
                        state.unselectedPlayers.filter(p=>p.position===2).map(p=>{p.availability="player-unavailable"})
                    }                                   
                    break;
                case 3:
                    if(mids < state.selectedFormation.midfielders){
                        state.unselectedPlayers.filter(p=>p.position===3).map(p=>{p.availability="player-available"})
                    } else {
                        state.unselectedPlayers.filter(p=>p.position===3).map(p=>{p.availability="player-unavailable"})
                    }                                   
                    break;
                case 4:
                    if(fwds < state.selectedFormation.forwards){
                        state.unselectedPlayers.filter(p=>p.position===4).map(p=>{p.availability="player-available"})
                    } else {
                        state.unselectedPlayers.filter(p=>p.position===4).map(p=>{p.availability="player-unavailable"})
                    }                                   
                    break;
                default:
                    break;                                
            }
            return state;
        case "FORMATION_CHANGED":
            //GOALKEEPERS
            if(state.selectedPlayers.filter(p=>p.position===1).length > state.selectedFormation.goalkeepers){
                state.unselectedPlayers.filter(p=>p.position===1).map(p=> {
                        p.availability="player-unavailable";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===1).length < state.selectedFormation.goalkeepers){
                state.unselectedPlayers.filter(p=>p.position===1).map(p=> {
                        p.availability="player-available";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===1).length > state.selectedFormation.goalkeepers){
                state.unselectedPlayers.filter(p=>p.position===1).map(p=> {
                        p.availability="player-unavailable";                
                })
            }

            //DEFENDERS
            if(state.selectedPlayers.filter(p=>p.position===2).length > state.selectedFormation.defenders){
                state.unselectedPlayers.filter(p=>p.position===2).map(p=> {
                        p.availability="player-unavailable";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===2).length < state.selectedFormation.defenders){
                state.unselectedPlayers.filter(p=>p.position===2).map(p=> {
                        p.availability="player-available";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===2).length > state.selectedFormation.defenders){
                state.unselectedPlayers.filter(p=>p.position===2).map(p=> {
                        p.availability="player-unavailable";                
                })
            }

            //MIDFIELDERS

            if(state.selectedPlayers.filter(p=>p.position===3).length > state.selectedFormation.midfielders){
                state.unselectedPlayers.filter(p=>p.position===3).map(p=> {
                        p.availability="player-unavailable";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===3).length < state.selectedFormation.midfielders){
                state.unselectedPlayers.filter(p=>p.position===3).map(p=> {
                        p.availability="player-available";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===3).length > state.selectedFormation.midfielders){
                state.unselectedPlayers.filter(p=>p.position===3).map(p=> {
                        p.availability="player-unavailable";                
                })
            }

            //FORWARDS
            if(state.selectedPlayers.filter(p=>p.position===4).length > state.selectedFormation.forwards){
                state.unselectedPlayers.filter(p=>p.position===4).map(p=> {
                        p.availability="player-unavailable";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===4).length < state.selectedFormation.forwards){
                state.unselectedPlayers.filter(p=>p.position===4).map(p=> {
                        p.availability="player-available";                
                })
            }

            if(state.selectedPlayers.filter(p=>p.position===4).length > state.selectedFormation.forwards){
                state.unselectedPlayers.filter(p=>p.position===4).map(p=> {
                        p.availability="player-unavailable";                
                })
            }
        return state;
        default:
            return state;
    }
}

export default setPlayerAvailability;