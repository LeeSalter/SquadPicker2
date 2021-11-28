import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {SquadContext} from '../../contexts/squad';
import getCookieValue from '../../components/authentication/getCookieValue';
import axios from 'axios';
import { API_BASE } from '../../constants/constants';
import TeamInfo from './teamInfo';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#243c5c",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const TeamList = () => {
    const [state, dispatch]=React.useContext(SquadContext);
    const [teams, setTeams] = React.useState([]);

    var token=getCookieValue("auth-token");
    const headers = {headers: {"Authorization": 'Bearer  ' + token,
                                "Timeout": 2000 }};

    useEffect(()=>{
        
        axios.get(API_BASE + "/api/team/all",headers)
        .then(res=>{
            setTeams(res.data)
            dispatch({type:"TEAMS_LOADED",payload:res.data})
        })
        .catch((error) =>{
            console.log(error);           
        })
    },[]);

    return (
        <div id="team-list-wrapper">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">Created Date</StyledTableCell>
                <StyledTableCell align="right">Formation</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {state.savedTeams.map((team)=>{return <TeamInfo id={team.id} createdDate={team.createdDateUtc} formation={team.formation.name}/>})}
              
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
}
export default TeamList;