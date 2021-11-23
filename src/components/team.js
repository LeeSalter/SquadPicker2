import React from 'react';
import { connect } from 'react-redux';
import { API_BASE } from '../constants/constants';
import { loadSquad, canLoadSquad, squadSaved } from '../actions/team';
import { loadFormation } from '../actions/formation';
import Player from './player';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import $ from 'jquery';

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
        const userId=this.props.userId;

        const saveState=()=>{
            var selectedPlayersIds = selectedPlayers.map(p=> {return p.id});
            var formationId=this.props.selectedFormation.id;
            var postBody={
                userId:userId,
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