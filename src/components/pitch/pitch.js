import React,{useContext} from 'react';
import { SquadContext } from '../../contexts/squad';
import FormationLayout from '../formations/formationLayout';

const Pitch= () => {
    const [state,dispatch]=useContext(SquadContext);

                return (
                <div id="pitch">
                    <FormationLayout/>
                </div>
        )
    }

export default Pitch;