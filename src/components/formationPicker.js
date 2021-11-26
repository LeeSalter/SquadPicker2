import React from 'react';
import { SquadContext } from '../contexts/squad';

const FormationPicker = (props)=> {

    const[state,dispatch]  = React.useContext(SquadContext);

    const handleFormationChanged = (e) =>{
        var selectedValue= e.target.value;
        var selectedFormation=state.formations.find(f=>f.id===selectedValue);
        dispatch({type:"FORMATION_CHANGED",payload:selectedFormation});
    }

    return(           
            <div class="formation-picker">
                <h2>Select Formation</h2>
                <select onChange={handleFormationChanged} value={props.selectedFormation}>
                {props.formations.map((f,i) => {           
                    return (
                        <option key={i} value={f.id}>{f.name}</option>
                    )            
                    })}
                </select>
            </div>
    )
    }

export default FormationPicker;