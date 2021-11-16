import React from 'react';
import { connect } from 'react-redux';
import { loadSquad, canLoadSquad, squadSaved } from '../actions/team';
import { loadFormation } from '../actions/formation';
import Player from './player';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { containerClasses } from '@mui/material';

class Team extends React.Component{
    
    componentDidMount(){
        this.setState(this.props.canLoad());
    }

    render(){
        const {squadPlayers} = this.props;
        const selectedPlayers=squadPlayers.filter(p=>p.selected);
        const playerCount=selectedPlayers.length;
        const playerItems = selectedPlayers.map((p, index)=>
                {return <Player position={p.position} name={p.name} id={p.id} key={p.id} thumbnail={p.thumb} selected={p.selected} validity={p.validity} availability={p.availability}></Player>}, this).sort(function(a,b){return a.id - b.id});
        const teamIsValid = squadPlayers.filter(p=>p.selected && p.validity==="player-valid").length===11;
        const canLoadSquad=this.props.canLoadSquad;

        const saveState=()=>{
            localStorage.setItem("Squad", JSON.stringify(squadPlayers));
            localStorage.setItem("Formation", JSON.stringify(this.props.selectedFormation))
            this.props.squadSaved();
        }

        const loadState=()=>{
            var squad = JSON.parse(localStorage.getItem("Squad"));
            var formation = JSON.parse(localStorage.getItem("Formation"));
            this.props.loadSquad(squad);            
            this.props.loadFormation(formation);
        }

        return (
            <div className="selectedPlayers">
                <h2>Selected players: {playerCount}</h2>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    <List component="nav">
                        {playerItems}
                    </List>
                </Box>
                <div className="buttons">
                    <Button variant="contained" disabled={!teamIsValid} onClick={saveState}>Save Team</Button>
                    <Button variant="contained" disabled={!canLoadSquad} onClick={loadState}>Load Team</Button>
                </div>
                </div>
        )
        }
}


const mapStateToProps = state =>{
    return {
        squadPlayers: state.squadPlayers,
        selectedFormation: state.selectedFormation,
        canLoadSquad: state.canLoadSquad
    }
};

function mapDispatchToProps(dispatch){
    return {
        loadSquad: (data)=>{
            dispatch(loadSquad(data))
        },
        loadFormation: (data) =>{
            dispatch(loadFormation(data))
        },
        squadSaved: () => {
            dispatch(squadSaved())
        },
        canLoad: () => {
            dispatch(canLoadSquad())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Team);

