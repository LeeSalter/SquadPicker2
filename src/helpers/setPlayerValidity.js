function setPlayerValidity(state,formation){
    let defs=state.selectedPlayers.filter(p=>p.position===2).length;
    let mids=state.selectedPlayers.filter(p=>p.position===3).length;
    let fwds=state.selectedPlayers.filter(p=>p.position===4).length;
    const teamAfterStateChange = [...state.selectedPlayers];    

    //DEFENDERS
    if(defs > formation.defenders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===2){
                p.validity="player-invalid";
            }
        })
    }

    if(defs < formation.defenders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===2){
                p.validity="player-valid";
            }
        })
    }

    if(defs === formation.defenders){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===2){
                p.validity="player-valid";
            }
        })
    }

    //MIDFIELDERS
    if(mids > formation.midfielders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===3){
                p.validity="player-invalid";
            }
        })
    }

    if(mids < formation.midfielders){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===3){
                p.validity="player-valid";
            }
        })
    }

    if(mids === formation.midfielders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===3){
                p.validity="player-valid";
            }
        })
    }

        //FORWARDS
    if(fwds > formation.forwards){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===4){
                p.validity="player-invalid";
            }
        })
    }


    if(fwds < formation.forwards){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===4){
                p.validity="player-valid";
            }
        })
    }

    if(fwds === formation.forwards){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===4){
                p.validity="player-valid";
            }
        })
    }

    state.unselectedPlayers.map(p=>p.validity="player-valid");

    return {...state, 
        selectedPlayers: teamAfterStateChange,
        unselectedPlayers: state.unselectedPlayers};
}

export default setPlayerValidity;