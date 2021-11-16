import React from 'react';
import { connect } from 'react-redux';
import Player from './player';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

class Squad extends React.Component {
        
    render(){     
        const playerCount=this.props.squadPlayers.length;
        const availablePlayers=this.props.squadPlayers.filter(function (p){return !p.selected});
        const playerItems = availablePlayers.map((p, index)=>{return <Player position={p.position} 
                                                                        name={p.name}   
                                                                        id={p.id} 
                                                                        key={p.id} 
                                                                        selected={p.selected} 
                                                                        availability={p.availability}
                                                                        validity={p.validity}>                                                                            
                                                                    </Player>}, this);
        return (
            <div>
                <h2>Players in squad : {playerCount}</h2>            
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    <List component="nav">
                        {playerItems}
                    </List>
                </Box>
            </div>
            
        )
    }

}

const mapStateToProps = state =>{
    return {
    squadPlayers:state.squadPlayers
    }
};

export default connect(mapStateToProps,null)(Squad);