import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE } from '../../constants/constants';
import {useHistory, useLocation} from 'react-router-dom';
import './login.css';
import {AuthenticatedContext} from '../../contexts/Login';

export default function Login()
{    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [state, dispatch]=React.useContext(AuthenticatedContext);
    
    let location = useLocation();
    let history = useHistory();
    let {from} = location.state || { from: { pathname: "/" } };

    const handleSubmit = async e => {
        e.preventDefault();
        axios.post(API_BASE + "/api/Login/authenticate",{username,password})
        .then(res=>{
            console.log("Response: " + res);
            let date=new Date();
            date.setTime(date.getTime() + (30 *24*60*60*1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = 'auth-token=' + res.data.token + "; expires=" + expires +";";                      
            document.cookie = 'auth-name=' + res.data.username + "; expires=" + expires +";";
            history.push(from);
            dispatch({type:"LOGGED_IN",payload:true})
        })
        .catch((error) =>{
            setLoginMessage(error.message);
            console.log(error);           
        })
    }

    return (
        <div class="login-wrapper fadeInDown">            
            <div id="formContent">
                <h2 class="active"> Sign In </h2>                    
                <form onSubmit={e=>handleSubmit(e)}>
                    <input type="text" id="login" class="fadeIn second" name="login" required placeholder="username" onChange={e=>setUsername(e.target.value)} />
                    <input type="password" id="password" class="fadeIn third" name="password" required placeholder="password" onChange={e=>setPassword(e.target.value)} />
                    <input type="submit" class="fadeIn fourth" value="Log In" />
                    <div><a href="./register">Register an account</a></div>
                    <div>{loginMessage}</div>
                </form>
            </div>
            
        </div>
    );
}