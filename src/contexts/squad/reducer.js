import setPlayerAvailability from "../../helpers/setPlayerAvailability";
import setPlayerValidity from "../../helpers/setPlayerValidity";

export const reducer = (state, action) => {
    switch(action.type){
        case "SELECT_PLAYER":
            const selectedPlayer = action.payload;
            selectedPlayer.selected=true;       
            
            var newState={...state,
            selectedPlayers: [...state.selectedPlayers,selectedPlayer].sort((a,b)=> a.position.toString().localeCompare(b.position) || b.id-a.id),
            unselectedPlayers:[...state.unselectedPlayers.filter(player=> player!==selectedPlayer)]}
            
            var updatedState=setPlayerAvailability(newState,selectedPlayer,"PLAYER_ADDED");
            
            return {
                ...state,
                selectedPlayers:updatedState.selectedPlayers,
                unselectedPlayers:updatedState.unselectedPlayers,
                teamSaveResult:""
            }
        case "DESELECT_PLAYER":
            const deselectedPlayer = action.payload;
            deselectedPlayer.selected=false;
            var myNewState={...state,
                unselectedPlayers: [...state.unselectedPlayers,deselectedPlayer].sort((a,b)=> a.position.toString().localeCompare(b.position) || b.id-a.id),
                selectedPlayers:[...state.selectedPlayers.filter(player=> player!==deselectedPlayer)]}
                console.log(myNewState);
                var updatedState = setPlayerAvailability(myNewState,deselectedPlayer,"PLAYER_REMOVED");
                updatedState=setPlayerValidity(updatedState,state.selectedFormation);
                                
                return {
                    ...state,
                    selectedPlayers:updatedState.selectedPlayers,
                    unselectedPlayers:updatedState.unselectedPlayers,
                    teamSaveResult:""
                }
        case "INITIAL_SQUAD_LOADED":{
            return {...state,
                selectedPlayers: action.payload.filter(p=>p.selected),
                unselectedPlayers: action.payload.filter(p=>!p.selected)}
        }
        case "SQUAD_LOADED":{        
            return {...state,
                selectedPlayers: action.payload.players.filter(p=>p.selected),
                unselectedPlayers: action.payload.players.filter(p=>!p.selected),
                selectedFormation:action.payload.formation}
        }
        case "FORMATIONS_LOADED":
            return {...state,
            formations: action.payload,
            selectedFormation: action.payload[0]}
        case "FORMATION_CHANGED":
            var newState={...state, selectedFormation:action.payload};
            var updatedState = setPlayerValidity(newState,action.payload);
            var finalState= setPlayerAvailability(updatedState,null,"FORMATION_CHANGED");
            return{...state,
            selectedFormation:action.payload,
            selectedPlayers:finalState.selectedPlayers,
            unselectedPlayers:finalState.unselectedPlayers,
            teamSaveResult:""}
        case "PLAYER_CREATED":
            return{...state,
            unselectedPlayers: [...state.unselectedPlayers,action.payload]}
        case "TEAMS_LOADED":
            return{...state,
            savedTeams: action.payload}
        case "TEAM_SAVED":
            console.log("Team saved");
            return {...state,
            teamSaveResult:"Team saved successfully."}
        default:
            return state;
    }   
}

export const initialState={
    selectedPlayers:[],
    unselectedPlayers:[],
    formations:[],
    selectedFormation:"",
    savedTeams:[]
}