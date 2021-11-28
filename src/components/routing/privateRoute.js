import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from '../authentication/isAuthenticated';

function PrivateRoute(props){
  return(
    <Route render={() => {
      if(isAuthenticated()) {
        console.log(props);
        return(props.children);
      } else {
        return(
          <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
        );
      }
    }}/>
  );
};
export default PrivateRoute;