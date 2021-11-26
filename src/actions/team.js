export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const CREATE_PLAYER='CREATE_PLAYER';
export const LOAD_SQUAD='LOAD_SQUAD';
export const SQUAD_LOADED='SQUAD_LOADED';
export const LOAD_TEAM = 'LOAD_TEAM';
export const LOAD_TEAMS = 'LOAD_TEAMS';
export const CAN_LOAD='CAN_LOAD';
export const SQUAD_SAVED='SQUAD_SAVED';

export const addPlayer = (id) => ({
    type:ADD_PLAYER,
    payload: {id}   
});

export const removePlayer = (id) => ({
    type: REMOVE_PLAYER,
    payload: {id}    
});

export const createPlayer = (name, position) =>({
    type:CREATE_PLAYER,
    payload:{
        name,
        position
    }
});

export const loadSquad= (data) => ({
    type: LOAD_SQUAD,
    payload: {data}
});

export const squadLoaded = (data)=>({
    type:SQUAD_LOADED,
    payload: {data}
});

export const canLoadSquad = () =>({
    type:CAN_LOAD
});

export const squadSaved =() => ({
    type:SQUAD_SAVED
});

export const loadTeam = (id) =>({
    type:LOAD_TEAM,
    payload: {id}
});

export const loadTeams= () =>({
    type:LOAD_TEAMS    
});
