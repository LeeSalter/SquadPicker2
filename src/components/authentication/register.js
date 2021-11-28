import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE } from '../../constants/constants';
import {useHistory, useLocation} from 'react-router-dom';
import './login.css';

export default function Register()
{    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    
    let location = useLocation();
    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        if(password!=confirmpassword){
            setRegisterMessage("Passwords do not match");
            return;
        }else{
            setRegisterMessage("");
        }

        axios.post(API_BASE + "/api/register/register",{username,password},{timeout:5000})
        .then(res=>{
            console.log("Response: " + res);
            let date=new Date();
            date.setTime(date.getTime() + (30 *24*60*60*1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = 'auth-token=' + res.data.token + "; expires=" + expires +";";                      
            document.cookie = 'auth-name=' + res.data.username + "; expires=" + expires +";";
            history.push("/login");
        })
        .catch((error) =>{
            setRegisterMessage(error);
            console.log(error);           
        })
    }

    return (
        <div class="login-wrapper fadeInDown">            
            <div id="formContent">
                <h2 class="active"> Register Account </h2>                    
                <form onSubmit={e=>handleSubmit(e)}>
                    <input type="text" id="login" class="fadeIn second" name="login" required placeholder="username" onChange={e=>setUsername(e.target.value)} />
                    <input type="password" id="password" class="fadeIn third" name="password" required placeholder="password" onChange={e=>setPassword(e.target.value)} />
                    <input type="password" id="confirmpassword" class="fadeIn third" name="confirm" required placeholder="confirm password" onChange={e=>setConfirmPassword(e.target.value)} />
                    <input type="submit" class="fadeIn fourth" value="Create Account" />
                    <div>{setRegisterMessage}</div>
                </form>
            </div>
        </div>
    );
}