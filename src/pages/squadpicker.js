import React, {useEffect, useState } from 'react';
import axios from 'axios';
import getCookieValue from '../components/authentication/getCookieValue';
import { API_BASE } from '../constants/constants';
import Pitch from '../components/pitch/pitch';
import Squad from '../components/teams/squad';
import Team from '../components/teams/team';
import FormationPicker from '../components/formations/formationPicker'
import { SquadContext } from '../contexts/squad';

const SquadPicker = (props) =>{
    
    const token=getCookieValue("auth-token");
    const headers = {headers: {"Authorization": 'Bearer  ' + token,
                                "Timeout": 2000 }};
    const [selectedPlayers,setSelectedPlayers] = useState([]);
    const [unselectedPlayers, setUnselectedPlayers] = useState([]);
    const [formations,setFormations]=useState([]);
    const [state, dispatch]=React.useContext(SquadContext);
    const username=getCookieValue("auth-name");

    const loadSquad = () => {   
        if(state.unselectedPlayers.length>0)     
            return;

        axios.get(API_BASE + "/api/Squad",headers)
        .then(res=>{
            setSelectedPlayers(res.data.filter(p=>p.selected));
            setUnselectedPlayers(res.data.filter(p=>!p.selected));
            dispatch({type:"INITIAL_SQUAD_LOADED",payload:res.data})
        })
        .catch((error) =>{
            console.log(error);           
        })
    }

    const loadFormations = () => {
        if(state.formations.length>0){
            return;
        }
        axios.get(API_BASE + "/api/formation",headers)
        .then(res=>{
            setFormations(res.data)
            dispatch({type:"FORMATIONS_LOADED",payload:res.data})
        })
        .catch((error) =>{
            console.log(error);           
        })

    }
            
    useEffect(()=>{  
        loadSquad();
    },[]);

    useEffect(()=>{
        loadFormations();
    },[]);
    
    return(
            <div className="container App">  
                <div className="heading">
                    <h2>Welcome {username}</h2>
                </div>
                <div id="squad-wrapper">
                        <div id="left-content">
                            <Team />
                            <FormationPicker />                          
                        </div>
                        <div id="center-content">
                            <Pitch/>                            
                        </div>
                        <div id="right-content">
                            <Squad />                          
                        </div>
                </div>
            </div>
    )
}

export default SquadPicker