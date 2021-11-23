import React from 'react';

import Pitch from './pitch';
import Squad from './squad';
import Team from './team';
import FormationPicker from './formationPicker'
import Logo from '../assets/england-logo.png';

class SquadPicker extends React.Component{

    render(){
        return(
            <div className="container App">  
                <div className="heading">
                    <img className="logo" src={Logo} alt="England logo"/>
                    <h1>England Team Selection</h1>  
                    <h2>Welcome {this.props.username}</h2>
                </div>
                <div id="squad-wrapper">
                        <div id="left-content">
                            <Team userId={this.props.userId}/>
                        </div>
                        <div id="center-content">
                            <Pitch/>
                            <FormationPicker />                            
                        </div>
                        <div id="right-content">
                            <Squad />                            
                        </div>
                </div>
            </div>
        )
    }
}

export default SquadPicker