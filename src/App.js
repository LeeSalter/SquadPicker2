import './App.css';
import Pitch from './components/pitch';
import Squad from './components/squad';
import Team from './components/team';
import FormationPicker from './components/formationPicker'

function App() {
  return (
    <div className="container App">  
      <h1>World's Best XI</h1>  
      <div className="row">
        <div class="column left-column">
          <Team />
        </div>
        <div className="center-column">
          <Pitch/>
          <FormationPicker />
        </div>
        <div className="column right-column">
          <Squad />
        </div>
      </div>
    </div>
    
  );
}

export default App;
