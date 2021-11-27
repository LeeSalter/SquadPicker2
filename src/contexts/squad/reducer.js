import $ from 'jquery';
export const reducer = (state, action) => {
    switch(action.type){
        case "SELECT_PLAYER":
            const selectedPlayer = action.payload;
            selectedPlayer.selected=true;       
            
            var newState={...state,
            selectedPlayers: [...state.selectedPlayers,selectedPlayer].sort((a,b)=> a.position.toString().localeCompare(b.position) || b.id-a.id),
            unselectedPlayers:[...state.unselectedPlayers.filter(player=> player!==selectedPlayer)]}
            
            let goalkeepers=newState.selectedPlayers.filter(p=>p.position===1).length;
            let defenders=newState.selectedPlayers.filter(p=>p.position===2).length;
            let midfielders=newState.selectedPlayers.filter(p=>p.position===3).length;
            let forwards=newState.selectedPlayers.filter(p=>p.position===4).length;

            switch(selectedPlayer.position){
                case 1:
                    if(goalkeepers>=state.selectedFormation.goalkeepers){
                        newState.unselectedPlayers.map(p=> {
                            if(p.position===1){
                                p.availability="player-unavailable";
                            }})}
                    break;
                case 2:
                    if(defenders>=state.selectedFormation.defenders){
                        newState.unselectedPlayers.map(p=> {
                            if(p.position===2){
                                p.availability="player-unavailable";
                            }})}
                    break;
                case 3:
                    if(midfielders>=state.selectedFormation.midfielders){
                        newState.unselectedPlayers.map(p=> {
                            if(p.position===3){
                                p.availability="player-unavailable";
                            }})}
                    break;
                case 4:
                    if(forwards>=state.selectedFormation.forwards){
                        newState.unselectedPlayers.map(p=> {
                            if(p.position===4){
                                p.availability="player-unavailable";
                            }})}
                    break;
                default:
                    break;                                
            }
            
            return {
                ...state,
                selectedPlayers:newState.selectedPlayers,
                unselectedPlayers:newState.unselectedPlayers
            }
        case "DESELECT_PLAYER":
            const deselectedPlayer = action.payload;
            deselectedPlayer.selected=false;
            var myNewState={...state,
                unselectedPlayers: [...state.unselectedPlayers,deselectedPlayer].sort((a,b)=> a.position.toString().localeCompare(b.position) || b.id-a.id),
                selectedPlayers:[...state.selectedPlayers.filter(player=> player!==deselectedPlayer)]}
                
                let gks=myNewState.selectedPlayers.filter(p=>p.position===1).length;
                let defs=myNewState.selectedPlayers.filter(p=>p.position===2).length;
                let mids=myNewState.selectedPlayers.filter(p=>p.position===3).length;
                let fwds=myNewState.selectedPlayers.filter(p=>p.position===4).length;
    
                switch(deselectedPlayer.position){
                    case 1:
                        if(gks < state.selectedFormation.goalkeepers){
                            myNewState.unselectedPlayers.map(p=> {
                                if(p.position===1){
                                    p.availability="player-available";
                                }}) 
                        }                                    
                        break;
                    case 2:
                        if(defs < state.selectedFormation.defenders){
                            myNewState.unselectedPlayers.map(p=> {
                                if(p.position===2){
                                    p.availability="player-available";
                                }}) 
                        } 
                        break;
                    case 3:
                        if(mids < state.selectedFormation.midfielders){
                            myNewState.unselectedPlayers.map(p=> {
                                if(p.position===3){
                                    p.availability="player-available";
                                }}) 
                        } 
                        break;
                    case 4:
                        if(fwds < state.selectedFormation.forwards){
                            myNewState.unselectedPlayers.map(p=> {
                                if(p.position===4){
                                    p.availability="player-available";
                                }}) 
                        } 
                        break;
                    default:
                        break;                                
                }
                
                return {
                    ...state,
                    selectedPlayers:myNewState.selectedPlayers,
                    unselectedPlayers:myNewState.unselectedPlayers
                }
        case "INITIAL_SQUAD_LOADED":{
            return {...state,
                selectedPlayers: action.payload.filter(p=>p.selected),
                unselectedPlayers: action.payload.filter(p=>!p.selected)}
        }
        case "SQUAD_LOADED":{    
            //figure out how to fire the change event for the formation dropdown so that the pitch formation updates.   
            //IDEA: create components for each formation containing the dots, then just load the appropriate one     
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
            var formationName=action.payload.name;
            switch(formationName) {
                case "4-4-2":
                    $("span[data-formation=4-4-2]").removeClass("hidden");
                    $("span[data-formation=4-3-3]").addClass("hidden");
                    $("span[data-formation=5-3-2]").addClass("hidden");
                    break;
                case "5-3-2":
                    $("span[data-formation=4-4-2]").addClass("hidden");
                    $("span[data-formation=4-3-3]").addClass("hidden");
                    $("span[data-formation=5-3-2]").removeClass("hidden");
                    break;
                case "4-3-3":
                    $("span[data-formation=4-4-2]").addClass("hidden");
                    $("span[data-formation=4-3-3]").removeClass("hidden");
                    $("span[data-formation=5-3-2]").addClass("hidden");
                    break;
                default:
                    break;
            }
            
            return{...state,
            selectedFormation:action.payload}
        case "PLAYER_CREATED":
            return{...state,
            unselectedPlayers: [...state.unselectedPlayers,action.payload]}
        case "TEAMS_LOADED":
            return{...state,
            savedTeams: action.payload}
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