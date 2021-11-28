import React, {useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import { API_BASE } from '../../constants/constants';
import {SquadContext} from '../../contexts/squad';
import getCookieValue from '../authentication/getCookieValue';
import '../../components/authentication/login.css';

const CreatePlayer = () =>{

    const token=getCookieValue("auth-token");
    const headers = {headers: {"Authorization": 'Bearer  ' + token,
                                "Timeout": 5000 }};

    const [state, dispatch]=React.useContext(SquadContext);
    const [playername, setPlayerName] = useState("");
    const [position, setPosition] = useState("1");
    const [message, setMessage]=useState("");

    let location = useLocation();
    let history = useHistory();
    let {from} = location.state || { from: { pathname: "/squadpicker" } };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage("");
        var data = {playername,position};
        console.log(data);
        axios.post(API_BASE + "/api/Squad/createplayer",{playername,position},headers)
        .then(res=>{
            dispatch({type:"PLAYER_CREATED",payload:res.data})
            setMessage("Created " + playername);            
        })
        .catch((error) =>{
            console.log(error);  
            setMessage(error);
        })
    }

    return(
        <div class="login-wrapper fadeInDown"> 
            <h2>Create a new player</h2>
            <div id="formContent">
                <h2 class="active"> Player Details </h2>                    
                <form onSubmit={e=>handleSubmit(e)}>
                    <input type="text" id="player-name" class="fadeIn second" name="login" required placeholder="player name" onChange={e=>setPlayerName(e.target.value)} />
                    <select id="player-position" class="fadeIn third" name="login" required placeholder="position" onChange={e=>setPosition(parseInt(e.target.value))}>
                            <option value="1">Goalkeeper</option>
                            <option value="2">Defender</option>
                            <option value="3">Midfielder</option>
                            <option value="4">Forward</option>
                    </select>
                    <input type="submit" class="fadeIn fourth" value="Create" />
                    <input type="button" class="fadeIn fourth" value="Cancel" onClick={()=>{window.location = "/squadpicker"}} />
                    <div>{message}</div>
                </form>
            </div>
        </div>
    )
}

export default CreatePlayer;