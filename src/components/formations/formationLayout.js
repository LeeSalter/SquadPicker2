import React from 'react';
import { SquadContext } from '../../contexts/squad';
import Formation433 from './formation433';
import Formation442 from './formation442';
import Formation532 from './formation532';

const FormationLayout= () =>{

    const[state,disapatch] = React.useContext(SquadContext);
    switch(state.selectedFormation.name){
        case "4-4-2":
            return <Formation442/>
        case "5-3-2":
            return <Formation532/>
        case "4-3-3":
            return <Formation433/>
        default:
            return <Formation442/>
    }
}

export default FormationLayout;