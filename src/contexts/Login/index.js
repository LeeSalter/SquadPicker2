import React from 'react';
import {reducer, initialState} from './reducer';

export const AuthenticatedContext = React.createContext({
    state: initialState,
    dispatch: () => null
})

export const AuthenticatedProvider = ({children})=>{
    const [state,dispatch]=React.useReducer(reducer,initialState)

    return(
        <AuthenticatedContext.Provider value={[state, dispatch]}>
            {children}
        </AuthenticatedContext.Provider>
    )
}