import React from 'react';
import { connect } from 'react-redux';
import { loadSquad } from '../actions/team';
import Player from './player';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';

class Team extends React.Component{
    
    render(){
        const {squadPlayers} = this.props;
        const selectedPlayers=squadPlayers.filter(p=>p.selected);
        const playerCount=selectedPlayers.length;
        const playerItems = selectedPlayers.map((p, index)=>
                {return <Player position={p.position} name={p.name} id={p.id} key={p.id} selected={p.selected} validity={p.validity} availability={p.availability}></Player>}, this).sort(function(a,b){return a.id - b.id});
        const teamIsValid = squadPlayers.filter(p=>p.selected && p.validity==="player-valid").length===11;
        
        const saveState=()=>{
            localStorage.setItem("Squad", JSON.stringify(squadPlayers));
        }

        const loadState=()=>{
            var squad = JSON.parse(localStorage.getItem("Squad"));
            console.log(squad);
            this.props.loadSquad(squad);
        }

        return (
            <div className="selectedPlayers">
                <h2>Selected players: {playerCount}</h2>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    <List component="nav">
                        {playerItems}
                    </List>
                </Box>
                <Button variant="contained" disabled={!teamIsValid} onClick={saveState}>Save Team</Button>
                <Button variant="contained" onClick={loadState}>Load Team</Button>
                </div>
        )
        }
}

const mapStateToProps = state =>{
    return {
        squadPlayers: state.squadPlayers
    }
};

function mapDispatchToProps(dispatch){
    return {
        loadSquad: (data)=>{
            dispatch(loadSquad(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Team);
