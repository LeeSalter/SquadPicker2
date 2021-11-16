export const CHANGE_FORMATION = 'CHANGE_FORMATION';
export const LOAD_FORMATION = 'LOAD_FORMATION';

export const changeFormation = (id) => ({
    type: CHANGE_FORMATION,
    payload: {id}
});

export const loadFormation = (data) => ({
    type: LOAD_FORMATION,
    payload: {data}
});