import React from 'react';
import { SquadContext } from '../contexts/squad';
import Player from './player';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

const Squad = ()=> {

    const [state, dispatch]=React.useContext(SquadContext);
    const availablePlayers=state.unselectedPlayers;
    return (   
            <div>
                <h2>Players in squad : {availablePlayers.length}</h2>            
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    <List component="nav">
                    {availablePlayers.map((p, index)=>{
                        
                        return <Player position={p.position} 
                                                                        name={p.name}   
                                                                        id={p.id} 
                                                                        key={p.id} 
                                                                        selected={p.selected} 
                                                                        availability={p.availability}
                                                                        validity={p.validity}
                                                                        thumbnail={p.thumb}>                                                                            
                                                                    </Player>}, this)}
                    </List>
                </Box>
            </div>
            
        )
}

export default Squad