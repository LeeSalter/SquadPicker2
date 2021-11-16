import React from 'react';
import { connect } from 'react-redux';
import { addPlayer, removePlayer } from '../actions/team';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

class Player extends React.Component{

    render(){
    const position= this.props.position;
    const name=this.props.name;
    const id=this.props.id;  
    const availability=this.props.availability;
    const validity=this.props.validity;
    const selected=this.props.selected;     

    const handleListItemClick = (event) => {
        if(selected){
            console.log("Removing "+ id + " from squad")
            this.props.removePlayerFromTeam(id);         
        }
        else{
            console.log("Adding " + id + " to squad")
            this.props.addPlayerToTeam(id);
        };
    }

    return (
        <ListItemButton className={[availability,validity].join(" ")} data-player-id={id} selected={selected} onClick={(event)=> handleListItemClick(event)}>
            <ListItemText  id={id}><span>{position}&nbsp;{name}</span></ListItemText>
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
