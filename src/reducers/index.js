import { ADD_PLAYER, REMOVE_PLAYER, LOAD_SQUAD, SQUAD_SAVED, CAN_LOAD, loadSquad } from "../actions/team";
import { CHANGE_FORMATION, LOAD_FORMATION } from "../actions/formation";
import { API_BASE } from "../constants/constants";
import $ from 'jquery';

export default function reducer (state, action){
    
    if(typeof state === 'undefined'){
        //Initialze state here.        
        const allPlayers=loadSquadFromDb();
        const formations=loadFormationsFromDb();
        const selectedFormaiton = formations[0];
        console.log("All players = " + allPlayers);
        state={
            squadPlayers: allPlayers,
            formations: formations,
            selectedFormation:selectedFormaiton,
            canLoadSquad:true,
            goalkeepers:0,
            defenders:0,
            midfielders:0,
            forwards:0
        }
    }    

    switch (action.type){
        case ADD_PLAYER:
            let playerToAdd = state.squadPlayers.find(player=>player.id===action.payload.id);
            if(playerToAdd===null){
                return;
            }            
            const updatedSquad= [...state.squadPlayers];
            updatedSquad[action.payload.id-1].selected=true;
            
            switch(playerToAdd.position){
                case 1:
                    state.goalkeepers++;
                    if(state.goalkeepers===state.selectedFormation.goalkeepers){
                        updatedSquad.map(p=> {
                            if(!p.selected && p.position===1){
                                p.availability="player-unavailable";
                            }
                        })
                    };
                    break;
                case 2:
                state.defenders++;
                if(state.defenders===state.selectedFormation.defenders){
                    updatedSquad.map(p=> {
                        if(!p.selected && p.position===2){
                            p.availability="player-unavailable";
                        }
                    })
                };
                break;
            case 3:
                state.midfielders++;
                if(state.midfielders===state.selectedFormation.midfielders){
                    updatedSquad.map(p=> {
                        if(!p.selected && p.position===3){
                            p.availability="player-unavailable";
                        }
                    })
                };
                break;
            case 4:
            state.forwards++;
            if(state.forwards===state.selectedFormation.forwards){
                updatedSquad.map(p=> {
                    if(!p.selected && p.position===4){
                        p.availability="player-unavailable";
                    }
                })
            };
            break;
                default:
                    break;
            }

            return{
                ...state,
                squadPlayers:updatedSquad
            }
            
        case REMOVE_PLAYER:
            let playerToRemove =  state.squadPlayers.find(player=>player.id===action.payload.id);
            if(playerToRemove===null){
                return;
            }            
            const updatedTeam = [...state.squadPlayers];
            updatedTeam[action.payload.id-1].selected=false;
            
            switch(playerToRemove.position){
                case 1:
                    state.goalkeepers--
                    if(state.goalkeepers<state.selectedFormation.goalkeepers){
                        updatedTeam.map(p=> {
                            if(!p.selected && p.position===1){
                                p.availability="player-available";
                            }
                        })
                    };

                    if(state.goalkeepers===state.selectedFormation.goalkeepers){
                        updatedTeam.map(p=> {
                            if(p.position===1){
                                p.validity="player-valid";
                            }
                        })
                        updatedTeam[action.payload.id-1].availability="player-unavailable";
                    };
                    break;
                case 2:
                state.defenders--
                if(state.defenders<state.selectedFormation.defenders){
                    updatedTeam.map(p=> {
                        if(!p.selected && p.position===2){
                            p.availability="player-available";
                        }
                    })                    
                };

                if(state.defenders===state.selectedFormation.defenders){
                    updatedTeam.map(p=> {
                        if(p.position===2){
                            p.validity="player-valid";
                        }
                        updatedTeam[action.payload.id-1].availability="player-unavailable";
                    })                    
                };
                break;
            case 3:
                state.midfielders--
                if(state.midfielders<state.selectedFormation.midfielders){
                    updatedTeam.map(p=> {
                        if(!p.selected && p.position===3){
                            p.availability="player-available";
                        }
                    })
                };

                if(state.midfielders===state.selectedFormation.midfielders){
                    updatedTeam.map(p=> {
                        if(p.position===3){
                            p.validity="player-valid";
                        }
                    })
                    updatedTeam[action.payload.id-1].availability="player-unavailable";
                };
            break;
            case 4:
                state.forwards--
                if(state.forwards<state.selectedFormation.forwards){
                    updatedTeam.map(p=> {
                        if(!p.selected && p.position===4){
                            p.availability="player-available";
                        }
                    })
                };

                if(state.forwards===state.selectedFormation.forwards){
                    updatedTeam.map(p=> {
                        if(p.position===4){
                            p.validity="player-valid";
                        }
                    })
                    updatedTeam[action.payload.id-1].availability="player-unavailable";
                };
            break;
                default:
                    break;


            }

            return{
                ...state,
                squadPlayers:updatedTeam
            }
        case CHANGE_FORMATION:
            var formation=state.formations.find(formation=>formation.id===action.payload.id);
            
            //Set validity
            var newState= setValidity(state, formation);
            var finalState = setAvailability(newState, formation);
            
            return {...state, 
                squadPlayers: finalState.squadPlayers,
                selectedFormation: formation};
        case CAN_LOAD:
            var savedSquad = JSON.parse(localStorage.getItem("Squad"));
            var sqvedFormation = JSON.parse(localStorage.getItem("Formation"));
            var canLoad= savedSquad!==null && sqvedFormation !==null;

            return {...state,
            canLoadSquad:canLoad}
        case SQUAD_SAVED:
            return {...state,
            canLoadSquad:true}

        case LOAD_SQUAD:
            const newSquad = action.payload.data;
            const goalkeepers = newSquad.filter(p=>p.position==="GK" && p.selected).length;
            const defenders = newSquad.filter(p=>p.position==="DEF" && p.selected).length;
            const midfielders = newSquad.filter(p=>p.position==="MID" && p.selected).length;
            const forwards = newSquad.filter(p=>p.position==="FWD" && p.selected).length;
            return {...state,
                squadPlayers:action.payload.data,
                goalkeepers:goalkeepers,
                defenders: defenders,
                midfielders: midfielders,
                forwards: forwards};
        case LOAD_FORMATION:
            return {...state,
            selectedFormation:action.payload.data}

        default:
            return state;
    };
}

const setValidity = (state, formation) => {    
    const teamAfterStateChange = [...state.squadPlayers];

    //DEFENDERS
    if(state.defenders > formation.defenders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===2){
                p.validity="player-invalid";
            }
        })
    }

    if(state.defenders < formation.defenders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===2){
                p.validity="player-valid";
            }
        })
    }

    if(state.defenders === formation.defenders){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===2){
                p.validity="player-valid";
            }
        })
    }

    //MIDFIELDERS
    if(state.midfielders > formation.midfielders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===3){
                p.validity="player-invalid";
            }
        })
    }

    if(state.midfielders < formation.midfielders){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===3){
                p.validity="player-valid";
            }
        })
    }

    if(state.midfielders === formation.midfielders){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===3){
                p.validity="player-valid";
            }
        })
    }

    if(state.forwards > formation.forwards){
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===4){
                p.validity="player-invalid";
            }
        })
    }

    //FORWARDS
    if(state.forwards < formation.forwards){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===4){
                p.validity="player-valid";
            }
        })
    }

    if(state.forwards === formation.forwards){        
        teamAfterStateChange.map(p=> {
            if(p.selected && p.position===4){
                p.validity="player-valid";
            }
        })
    }

    return {...state, 
        squadPlayers: teamAfterStateChange};

}

const setAvailability = (state, formation) => {
    const teamAfterStateChange = [...state.squadPlayers];
     //DEFENDERS
     if(state.defenders > formation.defenders){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===2){
                p.availability="player-unavailable";
            }
        })
     }

    if(state.defenders < formation.defenders){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===2){
                p.availability="player-available";
            }
        })
    }

    if(state.defenders === formation.defenders){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===2){
                p.availability="player-unavailable";
            }
        })
    }

    //MIDFIELDERS

    if(state.midfielders > formation.midfielders){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===3){
                p.availability="player-unavailable";
            }
        })
     }

    if(state.midfielders < formation.midfielders){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===3){
                p.availability="player-available";
            }
        })
    }

    if(state.midfielders === formation.midfielders){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===3){
                p.availability="player-unavailable";
            }
        })
    }

    //FORWARDS
    if(state.forwards > formation.forwards){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===4){
                p.availability="player-unavailable";
            }
        })
     }

    if(state.forwards < formation.forwards){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===4){
                p.availability="player-available";
            }
        })
    }

    if(state.forwards === formation.forwards){
        teamAfterStateChange.map(p=> {
            if(!p.selected && p.position===4){
                p.availability="player-unavailable";
            }
        })
    }

    return {...state, 
        squadPlayers: teamAfterStateChange};
}

const loadSquadFromDb = () => {    
    var players=[];
    var data = $.ajax({
        url: API_BASE + "/api/squad",
        async:false
    }).responseText;
    players = JSON.parse(data);
    return players;
}

const loadFormationsFromDb = () => {
    var formations=[];
    var data = $.ajax({
        url: API_BASE + "/api/formation",
        async:false
    }).responseText;
    formations=JSON.parse(data);
    return formations;
}