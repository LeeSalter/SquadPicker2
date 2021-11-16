import React from 'react';

class Pitch extends React.Component
{
    render(){
        return (
            <div>
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

                <div className="players">
                    <span class="dot goalkeeper hidden" data-position="goalkeeper" data-formation="all"></span>
                    <span class="dot four-four-two-left-back hidden" data-position="defender" data-formation-id="1"></span>
                    <span class="dot four-four-two-right-back hidden" data-position="defender" data-formation-id="1"></span>
                    <span class="dot four-four-two-left-center-back hidden" data-position="defender" data-formation-id="1"></span>
                    <span class="dot four-four-two-right-center-back hidden" data-position="defender" data-formation-id="1"></span>
                    <span class="dot four-four-two-left-winger hidden" data-position="midfielder" data-formation-id="1"></span>
                    <span class="dot four-four-two-right-winger hidden" data-position="midfielder" data-formation-id="1"></span>
                    <span class="dot four-four-two-left-center-mid hidden" data-position="midfielder" data-formation-id="1"></span>
                    <span class="dot four-four-two-right-center-mid hidden" data-position="midfielder" data-formation-id="1"></span>
                    <span class="dot four-four-two-left-center-fwd hidden" data-position="forward" data-formation-id="1"></span>
                    <span class="dot four-four-two-right-center-fwd hidden" data-position="forward" data-formation-id="1"></span>
                </div>
            </div>
        );
    }
}

export default Pitch;