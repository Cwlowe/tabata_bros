import React,{Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import {fetchWorkouts} from './store/workouts';
import Navbar from './components/navbar';

class App extends Component {
  constructor(props){
    super(props)
    console.log(props)
    
  }
  componentDidMount(){
    console.log("Fetching workouts: ", this.props.fetchWorkouts())
  }  
  render(){
    return (
      <div className="App">
        <Navbar />
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
