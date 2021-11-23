import React from 'react';
import { connect } from 'react-redux';
import { addPlayer, removePlayer } from '../actions/team';
import { Avatar } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/england-logo.png'

class Player extends React.Component{

    render(){
    const position= this.props.position;
    const name=this.props.name;
    const id=this.props.id;  
    const availability=this.props.availability;
    const validity=this.props.validity;
    const selected=this.props.selected;   
    const thumbnail=logo; 

    const handleListItemClick = (event) => {
        if(selected){
            this.props.removePlayerFromTeam(id);         
        }
        else{
            this.props.addPlayerToTeam(id);
        };
    }

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

}

function mapDispatchToProps(dispatch){
    return {
        addPlayerToTeam: (id)=>{
            dispatch(addPlayer(id))
        },
        removePlayerFromTeam: (id)=>{
            dispatch(removePlayer(id))
        }
    }
}

export default connect(null,mapDispatchToProps)(Player)
