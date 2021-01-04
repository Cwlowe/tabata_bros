
import React,{useState} from 'react';
import { useDispatch, useStore} from 'react-redux'
import {fetchWorkouts} from '../store/workouts';
//Material Ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop: '10%',
      padding:'3%'
    },
  });
 const WorkoutsPage = ()=>{
    const dispatch = useDispatch()
    const store = useStore()
    const classes = useStyles();
    const [state, setState] = useState({
        createdSessions: []
    })
    const handleCreateSession = () =>{
        const workouts = dispatch(fetchWorkouts())
        console.log(workouts)
        console.log(store.getState())
    }
    return(
        <div style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                <Container maxWidth="sm" style={{height: '100vh',paddingTop:'3vh' }}>
                   <Grid container justify="center" alignContent="center" spacing={3}>
                       <Grid item xs={5}>
                            <Button className={classes.button} variant="contained" color="primary" onClick={handleCreateSession}>Create Random Session</Button>
                       </Grid>
                       <Grid item xs={12}>

                       </Grid>
                   </Grid>
                </Container>
            </Container>
        </div>
    )
}

export default WorkoutsPage;