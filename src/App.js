import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/nav/navbar';
import Logo from './assets/england-logo.png';
import Login from './components/authentication/login';
import getCookieValue from './components/authentication/getCookieValue';
import { SquadProvider } from './contexts/squad';
import SquadPicker from './components/squadpicker';
import PrivateRoute from './components/privateRoute';
import isAuthenticated from './components/authentication/isAuthenticated';
import CreatePlayer from './components/createPlayer';
import TeamList from './components/teams/teamList';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>    
      <div id="wrapper">
          <img className="logo" src={Logo} alt="England logo"/>    
      <Switch>
        <Route exact path="/" render={()=>{
          if(isAuthenticated()){
            return(
              <Redirect to="/squadpicker"/>
            )
          } else{ 
            return(
              <Redirect to="/login"/>
            )
          }                      
        }}/>
        <Route exact path="/login" component={Login}></Route>
        <PrivateRoute path="/squadpicker">
          <SquadProvider>
            <SquadPicker username={getCookieValue("auth-name")}/>
          </SquadProvider>
        </PrivateRoute>
        <PrivateRoute path="/players/create">
          <SquadProvider>
            <CreatePlayer />
          </SquadProvider>
        </PrivateRoute>
        <PrivateRoute path="/teams">
          <SquadProvider>
            <TeamList/>
          </SquadProvider>
        </PrivateRoute>
      </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
