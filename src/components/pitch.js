import React from 'react';

class Pitch extends React.Component
{
    render(){
        return (
        <div className='football-pitch'>
            <div className='outline marking'></div>
            <div className='box left marking'></div>
            <div className='box-d left marking'></div>
            <div className='box left small marking'></div>
            <div className='box right marking'></div>
            <div className='box-d right marking'></div>
            <div className='box right small marking'></div>
            <div className='spot left marking'></div>
            <div className='spot right marking'></div>
            <div className='spot center marking'></div>
            <div className='center-line marking'></div>
            <div className='center-circle marking'></div>
            <div className='corner top left marking'></div>
            <div className='corner top right marking'></div>
            <div className='corner bottom left marking'></div>
            <div className='corner bottom right marking'></div>
            <div className='grass'></div>
        </div>
        );
    }
}

export default Pitch;