import React,{Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import {fetchWorkouts} from './store/workouts';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';

class App extends Component {
  componentDidMount(){
    this.props.fetchWorkouts()
  }  
  render(){
    return (
      <div className="App">
        <Card style={{backgroundColor:"#243665",padding:"5%"}}className="AppCard">
          <CardContent style={{color:"#FEFEFE"}}>
            <h1>Tabata Bros</h1>
            <p>Tabata training is a high-intensity interval training (HIIT) workout, featuring exercises that typically last between 4 - 5 minutes. Tabata’s typically follow this structure:</p>
            <ul>
              <li>Work out hard for 20 seconds</li>
              <li>Rest for 10 seconds</li>
              <li>Complete 8 rounds</li>
            </ul>
            <p>We’ve created this workout generator to take the thinking out of working out so you can just do it!</p>
          </CardContent>
          <CardActions>
            <Button component="a" variant="contained" style={{backgroundColor:"#8BD8BD",color:"#243665"}}href="/tabataGenerator">
            Create your first workout
            </Button>
          </CardActions>
        </Card>
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
