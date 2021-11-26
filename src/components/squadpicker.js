import React, {useEffect, useState } from 'react';
import axios from 'axios';
import getCookieValue from './authentication/getCookieValue';
import { API_BASE } from '../constants/constants';
import Pitch from './pitch';
import Squad from './squad';
import Team from './team';
import FormationPicker from './formationPicker'
import { SquadContext } from '../contexts/squad';

const SquadPicker = (props) =>{
    
    const token=getCookieValue("auth-token");
    const headers = {headers: {"Authorization": 'Bearer  ' + token }};
    const [squadPlayers,setSquad] = useState([])
    const [formations,setFormations]=useState([]);
    const [state, dispatch]=React.useContext(SquadContext);

            
    useEffect(()=>{
        
        axios.get(API_BASE + "/api/Squad",headers)
        .then(res=>{
            setSquad(res.data)
            dispatch({type:"SQUAD_LOADED",payload:res.data})
        })
        .catch((error) =>{
            console.log(error);           
        })
    },[]);

    useEffect(()=>{
        axios.get(API_BASE + "/api/formation",headers)
        .then(res=>{
            setFormations(res.data)
            dispatch({type:"FORMATIONS_LOADED",payload:res.data})
        })
        .catch((error) =>{
            console.log(error);           
        })
    },[]);
    
    return(
            <div className="container App">  
                <div className="heading">
                    <h2>Welcome {props.username}</h2>
                </div>
                <div id="squad-wrapper">
                        <div id="left-content">
                            <Team userId={props.userId}/>
                        </div>
                        <div id="center-content">
                            <Pitch/>
                            {formations && <FormationPicker formations={formations} selectedFormation={formations[0]} /> }                           
                        </div>
                        <div id="right-content">
                            {squadPlayers && <Squad squad={state.unselectedPlayers} /> }                           
                        </div>
                </div>
            </div>
    )
}

export default SquadPicker