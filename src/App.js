import './App.css';
import Pitch from './components/pitch';
import Squad from './components/squad';
import Team from './components/team';
import FormationPicker from './components/formationPicker'

function App() {
  return (
    <div className="container">  
  <h1>World's Best XI</h1>  
  <div className="row">
    <Team className="column"/>
    <div className="column">
      <Pitch/>
      <FormationPicker />
    </div>
    <Squad className="column"/>
    </div>
    </div>
    
  );
}

export default App;
