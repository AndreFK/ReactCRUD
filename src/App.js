import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      notes: []
    }
    this.addNote = this.addNote.bind(this);
    this.remove = this.remove.bind(this);
    this.editH = this.editH.bind(this);
  }

  editH(id, conte){
    let next = this.state.notes;

    next = next.map(note => {
      if(note.idnota === id ){
        note.idnota = id;
        note.Content = conte;
      }
      return note;
    })
    this.setState({
      notes: next
    })
    console.log(this.state.notes)
    let data = {idnota: id, Content: conte};
    let j = JSON.stringify(data);
    
    console.log(j);
    
    fetch('http://localhost:54275/api/values', {
      method: 'PUT',
      body: JSON.stringify(data),
      
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.text());
    window.location.reload();
  }

  remove(noteID){
    const next = this.state.notes;
    const dnote = next.filter(note=>{
      return note.idnota !== noteID;
    });
    this.setState({
      notes: dnote
    })

    let url = 'http://localhost:54275/api/values/'+noteID;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.text())
    .catch(error => console.error('Error: ', error))
  }

  addNote(note){
    const prevnote = this.state.notes;
    prevnote.push({idnota: prevnote.slice(-1)[0].idnota, Content: note});
    this.setState({
      notes: prevnote
      
    })
    console.log(prevnote);
    const nnote = prevnote[prevnote.length - 1];
    nnote.idnota = prevnote[prevnote.length - 1].idnota + 1;
    console.log(nnote.idnota);

    fetch('http://localhost:54275/api/values',{
      method: 'POST',
      body: JSON.stringify(nnote),
      
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.text())
    .then(response => console.log('Success: ', response))
  }


  componentWillMount(){
    fetch('http://localhost:54275/api/values', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response){
      return response.json();
    })
    .then(response => (this.setState({notes: response})))
    .catch(error => console.log(error))
  }

  componentDidMount(){
    fetch('http://localhost:54275/api/values', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response){
      return response.json();
    })
    .then(response => (this.setState({notes: response})))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React To-Do List</div>
        </div>
        <div className="notesBody">
         
          {
            this.state.notes.map((note, i) => {
              return (
                <Note contenido={note.Content} 
                idNota={note.idnota} key ={i}
                remove={this.remove}
                editH = {this.editH}/>
              )
            })
          }
        </div>
        <div className="Footer">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
