import React from 'react';
import PitchImage from '../assets/FOOTBALL_FIELD.jpg';

class Pitch extends React.Component
{
    render(){
                return (
                <img className='pitch' src={PitchImage} alt="Football pitch"/>
        )
    }
}

export default Pitch;