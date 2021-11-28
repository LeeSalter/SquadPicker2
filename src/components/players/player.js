import React from 'react';
import {SquadContext} from '../../contexts/squad';
import { Avatar } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import logo from '../../assets/england-logo.png'

const Player=(props)=>{
    const[state,dispatch] = React.useContext(SquadContext);

    const position= props.position;
    const name=props.name;
    const id=props.id;  
    const availability=props.availability;
    const validity=props.validity;
    const selected=props.selected;   
    const thumbnail=logo; 

    const handleListItemClick = ((event) => {
        if(selected){
            dispatch({type:"DESELECT_PLAYER",payload:state.selectedPlayers.find(p=>p.id===id)})      
        }
        else{
            dispatch({type:"SELECT_PLAYER",payload:state.unselectedPlayers.find(p=>p.id===id)}) 
        };
    })

    const positionToString= (pos) => {
        switch(pos){
            case 1:
                return "GK";
            case 2:
                return "DEF";
            case 3: 
                return "MID";
            case 4:
                return "FWD";
            default:
                return "";
            }
    }

    return (
        <ListItemButton className={[availability,validity].join(" ")} data-player-id={id} selected={selected} onClick={(event)=> handleListItemClick(event)}>
            <ListItemAvatar>
                <Avatar alt="squad player" src={thumbnail}/>
            </ListItemAvatar>
            <ListItemText  id={id}><span>{positionToString(position)}&nbsp;{name}</span></ListItemText>
        </ListItemButton>
    );  

}

export default Player
