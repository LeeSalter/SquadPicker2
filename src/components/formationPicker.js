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
            <div>
                <h2>Select Formation</h2>
                <select onChange={this.handleFormationChanged} defaultValue="1">
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
        console.log("GetFormation:" + this.state.SelectedFormation);
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
    formations:state.formations
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(FormationPicker);