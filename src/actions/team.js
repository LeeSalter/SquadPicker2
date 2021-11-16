export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER'
export const LOAD_SQUAD='LOAD_SQUAD';

export const addPlayer = (id) => ({
    type:ADD_PLAYER,
    payload: {id}   
});

export const removePlayer = (id) => ({
    type: REMOVE_PLAYER,
    payload: {id},    
});

export const loadSquad= (data) => ({
    type: LOAD_SQUAD,
    payload: {data}
});
