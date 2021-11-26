import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Logo from './assets/england-logo.png';
import Login from './components/authentication/login';
import getCookieValue from './components/authentication/getCookieValue';
import { SquadProvider } from './contexts/squad';
import SquadPicker from './components/squadpicker';
import PrivateRoute from './components/privateRoute';
import isAuthenticated from './components/authentication/isAuthenticated';

function App() {

  return (
    <BrowserRouter>
      <div id="wrapper">
          <h1>England Team Selection Tool</h1>
          <img className="logo" src={Logo} alt="England logo"/>
      </div>
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
      </Switch>
      </BrowserRouter>
  );
}

export default App;
