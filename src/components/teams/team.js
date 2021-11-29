import React from 'react';
import { API_BASE } from '../../constants/constants';
import { SquadContext } from '../../contexts/squad';
import Player from '../players/player';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import getCookieValue from '../authentication/getCookieValue';
import $ from 'jquery';

const Team = ()=> {
    const[state,dispatch]=React.useContext(SquadContext);

        const [saveResult,setSaveResult]=React.useState("");
        const token=getCookieValue("auth-token");
        const selectedPlayers=state.selectedPlayers;
        const playerCount=selectedPlayers.length;
        const playerItems = selectedPlayers.map((p, index)=>
                {return <Player position={p.position} name={p.name} id={p.id} key={p.id} thumbnail={p.thumb} selected={p.selected} validity={p.validity} availability={p.availability}></Player>}, this).sort(function(a,b){return a.id - b.id});
        const teamIsValid = selectedPlayers.filter(p=>p.validity==="player-valid").length===11;

        const saveState=()=>{
            setSaveResult("");
            var selectedPlayersIds = selectedPlayers.map(p=> {return p.id});
            var formationId=state.selectedFormation.id;
            var postBody={
                formationId:formationId,
                playerIds:selectedPlayersIds
            }

            $.ajax({
                url: API_BASE + "/api/team/saveTeam",
                async:false,
                method: "POST",
                contentType:"application/json",
                dataType:"json",
                data: JSON.stringify(postBody),
                headers: {"Authorization": 'Bearer ' + token }
            });
            dispatch({type:"TEAM_SAVED",payload:{selectedPlayers,formationId}})
            setSaveResult("Team saved successfully");
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
                    <p>{state.teamSaveResult}</p>
                </div>
                </div>
        )        
}

export default Team