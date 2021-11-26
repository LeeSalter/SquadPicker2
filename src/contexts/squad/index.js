import React from 'react';
import {reducer, initialState} from './reducer';

export const SquadContext = React.createContext({
    state: initialState,
    dispatch: () => null
})

export const SquadProvider = ({children})=>{
    const [state,dispatch]=React.useReducer(reducer,initialState)

    return(
        <SquadContext.Provider value={[state, dispatch]}>
            {children}
        </SquadContext.Provider>
    )
}