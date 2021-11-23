import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { API_BASE } from '../constants/constants';
import Logo from '../assets/england-logo.png';
import './login.css';

export default function Login({setToken})
{    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });

        setToken(response)
        }

    return (
        <div class="login-wrapper fadeInDown">
            <h1>Welcome to the Squad Selection Tool</h1>
            <img className="logo" src={Logo} alt="England logo"/>
            <div id="formContent">
                <h2 class="active"> Sign In </h2>                    
                <form onSubmit={e=>handleSubmit(e)}>
                    <input type="text" id="login" class="fadeIn second" name="login" placeholder="username" onChange={e=>setUsername(e.target.value)} />
                    <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                    <input type="submit" class="fadeIn fourth" value="Log In" />
                </form>
            </div>
        </div>
    );
}

Login.propTypes={
    setToken: PropTypes.func.isRequired
}

async function loginUser(credentials){
    return fetch(API_BASE + "/api/Login/authenticate", {
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify(credentials)
    })
    .then(data=>data.json())
}