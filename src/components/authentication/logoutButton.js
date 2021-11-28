import React from 'react';
import { IconButton } from '@mui/material';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import { AuthenticatedContext } from '../../contexts/Login';
import {useHistory} from 'react-router-dom';

function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

const LogoutButton = () =>{
    const [state, dispatch]=React.useContext(AuthenticatedContext);
    let history = useHistory();

    const handleLogout=() =>{        
        setCookie("auth-token", "", -1); 
        dispatch({type:"LOGGED_OUT", payload:false});
        history.push("/login");
    }

    if(state.authenticated){
        return <IconButton onClick={handleLogout}><LogoutRounded/></IconButton>
    }

    return "";
}

export default LogoutButton;