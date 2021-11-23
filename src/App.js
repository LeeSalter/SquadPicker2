import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import useToken from './data/token';
import SquadPicker from './components/squadpicker';
import Login from './components/login';

function App() {

  const {token, setToken, getUsername, getExpiry, getUserId} = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  if(getExpiry() < Date.now()){
    return <Login setToken={setToken} />
  }

  return (
    
    <div className="wrapper">      
      <SquadPicker username={getUsername()} userId={getUserId()} />
    </div>
  );
}

export default App;
