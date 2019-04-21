import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';


class Note extends Component{
    constructor(props){
        super(props);
        this.contenido = props.contenido;
        this.idNota = props.idNota;
        this.state={ 
            ncont:''
        }
        this.removeHand = this.removeHand.bind(this);
        this.edit = this.edit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
        this.setState({
            ncont: e.target.value, 
        })
        
    }

    edit(id, cont){
        this.props.editH(id, cont);
        this.setState({
            ncont: ''
        })
    }

    removeHand(id){
        this.props.remove(id);
    }

    render(props){
        return(
            <div className = "note fade-in">
            <div><span className="closebtn" 
                onClick={()=>this.removeHand(this.idNota)}>&times;
                
                </span>
                <br></br>
                <span className="closebtn" onClick={()=> {this.edit(this.idNota, this.state.ncont);this.handlenCont(this.contenido)}}>&upsilon;
                </span>
                <span><input value={this.state.ncont} onChange={this.handleInput}></input></span>
                </div>
                <label><h5>ID: {this.idNota}</h5></label>
                <p className= "contenido">{this.contenido}</p>
                
            </div>
        )
    }
}

Note.propTypes = {
    contenido: PropTypes.string
}

export default Note;
