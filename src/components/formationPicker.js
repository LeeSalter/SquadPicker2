import React from 'react';
import { connect } from 'react-redux';
import {changeFormation} from '../actions/formation';

class FormationPicker extends React.Component{
    render(){ 
        let formationsList = this.props.formations.map((f,i) => {           
                return (
                    <option key={i} value={f.id}>{f.name}</option>
            )            
        }, this);
    
        return (
            <div class="formation-picker">
                <h2>Select Formation</h2>
                <select onChange={this.handleFormationChanged} value={this.props.selectedFormation.id}>
                    {formationsList}
                </select>
            </div>
        );
    }

    handleFormationChanged = (e) =>{
        var selectedValue= e.target.value;
        this.props.updateFormation(selectedValue)
    }

    getFormation=()=>{
        return this.state.SelectedFormation;
    }

}

function mapDispatchToProps(dispatch){
    return {
        updateFormation: (id)=>{
            dispatch(changeFormation(id))
        }
    }
}

const mapStateToProps = state =>{
    return {
    formations:state.formations,
    selectedFormation:state.selectedFormation
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(FormationPicker);