import React from 'react';
import { connect } from 'react-redux';
import { API_BASE } from '../constants/constants';
import { SquadContext } from '../contexts/squad';
import { loadTeam, canLoadSquad, squadSaved } from '../actions/team';
import { loadFormation } from '../actions/formation';
import Player from './player';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import $ from 'jquery';

const Team = ()=> {
    const[state,dispatch]=React.useContext(SquadContext);

        const selectedPlayers=state.selectedPlayers;
        const playerCount=selectedPlayers.length;
        const playerItems = selectedPlayers.map((p, index)=>
                {return <Player position={p.position} name={p.name} id={p.id} key={p.id} thumbnail={p.thumb} selected={p.selected} validity={p.validity} availability={p.availability}></Player>}, this).sort(function(a,b){return a.id - b.id});
        const teamIsValid = selectedPlayers.filter(p=>p.validity==="player-valid").length===11;

        const saveState=()=>{
            var selectedPlayersIds = selectedPlayers.map(p=> {return p.id});
            var formationId=this.props.selectedFormation.id;
            var postBody={
                formationId:formationId,
                playerIds:selectedPlayersIds
            }
            var token = JSON.parse(localStorage.getItem('token')).token;

            console.log("Token: " + token);

            $.ajax({
                url: API_BASE + "/api/squad/saveTeam",
                async:false,
                method: "POST",
                contentType:"application/json",
                dataType:"json",
                data: JSON.stringify(postBody),
                headers: {"Authorization": 'Bearer ' + token }
            });
            this.props.squadSaved();
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
                </div>
                </div>
        )        
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
        loadTeam: (data)=>{
            dispatch(loadTeam(data))
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