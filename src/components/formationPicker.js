import React from 'react';
import { SquadContext } from '../contexts/squad';

const FormationPicker = ()=> {

    const[state,dispatch]  = React.useContext(SquadContext);

    const handleFormationChanged = (e) =>{
        var selectedValue= e.target.value;
        var selectedFormation=state.formations.find(f=>f.id===selectedValue);
        dispatch({type:"FORMATION_CHANGED",payload:selectedFormation});
    }

    return(           
            <div class="formation-picker">
                <h2>Select Formation</h2>
                <div>
                <select id="formations" onChange={handleFormationChanged} defaultValue={state.selectedFormation.id}>
                {state.formations.map((f,i) => {            
                    return (
                        <option key={i} value={f.id}>{f.name}</option>
                    )            
                    })}
                </select>
                </div>
            </div>
    )
    }

export default FormationPicker;