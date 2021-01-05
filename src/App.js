import React,{Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import {fetchWorkouts} from './store/workouts';

class App extends Component {
  constructor(props){
    super(props)
    console.log(props)
    
  }
  componentDidMount(){
    this.props.fetchWorkouts()
    
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

const mapState = (state) => {
  return {
    workouts: state.workoutReducer,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  };
};

export default connect(mapState, mapDispatch)(App);
