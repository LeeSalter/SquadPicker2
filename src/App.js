import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/nav/navbar';
import Logo from './assets/england-logo.png';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import getCookieValue from './components/authentication/getCookieValue';
import { SquadProvider } from './contexts/squad';
import { AuthenticatedProvider } from './contexts/Login';
import SquadPicker from './pages/squadpicker';
import PrivateRoute from './components/routing/privateRoute';
import isAuthenticated from './components/authentication/isAuthenticated';
import CreatePlayer from './components/players/createPlayer';
import TeamList from './components/teams/teamList';

function App() {

  return (
    <div id="wrapper">
    <img className="logo" src={Logo} alt="England logo"/>  
    <BrowserRouter>
      <AuthenticatedProvider>
        <Navbar/>          
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
        <Route exact path="/register" component={Register}></Route>
        </Switch>
        </AuthenticatedProvider>
        <Switch>
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
      </BrowserRouter>
      </div>
  );
}

export default App;
