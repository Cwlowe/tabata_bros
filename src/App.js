import React,{Component} from 'react';
import './App.css';
import firebase from './fire'

class App extends Component {
  constructor(){
    super()
    this.database = firebase.database()
    console.log("Firebase database: ", this.database)

  
  }
  componentDidMount(){
    let workoutRef = firebase.database().ref('/workouts');

    let test = workoutRef.on('value',(snap) =>{
      console.log(snap.val())
    })
    console.log(test)
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          Tabata Bro!
        </header>
      </div>
    );
  }
}

export default App;
