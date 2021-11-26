import React from 'react';
import PitchImage from '../assets/FOOTBALL_FIELD.jpg';

class Pitch extends React.Component
{
    render(){
                return (
                <div id="pitch">
                    <span className="dot GK"/>
                    <span data-formation="4-4-2" className="dot LB"/>
                    <span data-formation="4-4-2" className="dot LCB"/>
                    <span data-formation="5-3-2" className="dot LB hidden"/>
                    <span data-formation="5-3-2" className="dot LCB hidden"/>
                    <span data-formation="5-3-2" className="dot CB hidden"/>
                    <span data-formation="4-4-2" className="dot RCB"/>
                    <span data-formation="4-4-2" className="dot RB"/>
                    <span data-formation="5-3-2" className="dot RCB hidden"/>
                    <span data-formation="5-3-2" className="dot RB hidden"/>
                    <span data-formation="4-3-3" className="dot LB hidden"/>
                    <span data-formation="4-3-3" className="dot LCB hidden"/>
                    <span data-formation="4-3-3" className="dot RCB hidden"/>
                    <span data-formation="4-3-3" className="dot RB hidden"/>
                    <span data-formation="4-4-2" className="dot LM"/>
                    <span data-formation="4-4-2" className="dot LCM"/>
                    <span data-formation="4-4-2" className="dot RCM"/>
                    <span data-formation="4-4-2" className="dot RM"/>
                    <span data-formation="4-3-3" className="dot IL  hidden"/>
                    <span data-formation="4-3-3" className="dot CM  hidden"/>
                    <span data-formation="4-3-3" className="dot IR  hidden"/>
                    <span data-formation="5-3-2" className="dot IL  hidden"/>
                    <span data-formation="5-3-2" className="dot CM  hidden"/>
                    <span data-formation="5-3-2" className="dot IR  hidden"/>
                    <span data-formation="4-4-2" className="dot CF1"/>
                    <span data-formation="4-4-2" className="dot CF2"/>
                    <span data-formation="5-3-2" className="dot CF1 hidden" />
                    <span data-formation="5-3-2" className="dot CF2 hidden"/>
                    <span data-formation="4-3-3" className="dot LCF  hidden"/>
                    <span data-formation="4-3-3" className="dot CF  hidden"/>
                    <span data-formation="4-3-3" className="dot RCF  hidden"/>
                </div>
        )
    }
}

export default Pitch;