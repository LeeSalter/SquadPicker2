import React,{useState,useContext} from 'react';
import axios from 'axios';
import getCookieValue from '../authentication/getCookieValue';
import { API_BASE } from '../../constants/constants';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { SquadContext } from '../../contexts/squad';
import { useHistory } from 'react-router';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
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

const TeamInfo = (props) => {
    const [state, dispatch]=React.useContext(SquadContext);
    const token=getCookieValue("auth-token");
    const headers = {headers: {"Authorization": 'Bearer  ' + token,
                                "Timeout": 5000 }};
    const history=useHistory();                                
    const handleLoadTeam = (id)=>{
        axios.get(API_BASE + "/api/team?Id=" + id,headers)
        .then(res=>{            
            dispatch({type:"SQUAD_LOADED",payload:res.data})
            history.push("/squadpicker");
        })
        .catch((error) =>{
            console.log(error);           
        })        
    }

    return(
        <StyledTableRow key={props.id}>
        <StyledTableCell component="th" scope="row">
          {props.id}
        </StyledTableCell>
        <StyledTableCell align="right">{props.createdDate}</StyledTableCell>
        <StyledTableCell align="right">{props.formation}</StyledTableCell>
        <StyledTableCell align="right"><input type="button" value="Load Team" onClick={()=>{handleLoadTeam(props.id)}}/></StyledTableCell>
      </StyledTableRow>
    )
}

export default TeamInfo;