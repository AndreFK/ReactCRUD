import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newContenido: ''
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }


    handleUserInput(e){
        this.setState({
            newContenido: e.target.value, 
        })
    }

    writeNote(){        
        this.props.addNote(this.state.newContenido);
        this.setState({
            newContenido: '',
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="noteInput"
                value={this.state.newContenido} 
                onChange={this.handleUserInput} />
                <button className="noteButton"
                onClick={this.writeNote}>Agregar Nota</button>
            </div>
        )
    }
}

export default NoteForm;