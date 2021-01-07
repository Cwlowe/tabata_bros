import React from 'react'
import firebase from '../fire'
//Material Ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop: '10%',
      padding:'3%'
    },
    formControl: {
        margin: 3,
    },
  });

  export default function CreateWorkout(){
    const [state, setState] = React.useState({
        name:"",
        description:"",
        type:[],
        checked:{
            core: false,
            lower_core: false,
            chest: false,
            obliques:false,
            arms:false,
            lower_body:false,
        },
        error: false,
    });
    const classes = useStyles();

    const handleCheckbox = (event) => {

        setState({ 
            ...state, 
            type: [...state.type, event.target.name],
            checked:{
                ...state.checked,
                [event.target.name]:event.target.checked
            }
        });
        console.log(state.type)
    }

    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value});
    };

    const handleSubmit=(event)=>{
        console.log(state)
        if(errorType || errorName){
            setState({...state, error:true})
        }else{
            console.log("Sent Data")
            //creates a workID for workout
            let workoutID = state.name.toLowerCase().replace(/^\s+|\s+$/gm,'').split(' ').join('_')
            let newState = {
                name:state.name,
                description: state.description, 
                id:workoutID,
                type:state.type,
            }
            pushNewWorkout(newState)
            setState({
                name:"",
                description:"",
                type:[],
                checked:{
                    core: false,
                    lower_core: false,
                    chest: false,
                    obliques:false,
                    arms:false,
                    lower_body:false,
                },
                error:false,
            })
        }
    }
    const errorType = state.type.length === 0;
    const errorName = state.name.length === 0;
    return(
        <div style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                <Container maxWidth="sm" style={{height: '100vh',paddingTop:'3vh' }}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent >
                        
                            <form >
                                <Grid container spacing={3}>
                                    {
                                        state.error ? 
                                        <Grid item xs={12}>
                                            <Alert severity="error">Please fill out the required fields</Alert>
                                        </Grid>
                                        :
                                        null
                                    }
                                    <Grid item xs={6}>
                                        <FormControl required error={errorName}>
                                            <InputLabel htmlFor="name">Workout Name</InputLabel>
                                            <Input id="name" value={state.name} onChange={handleChange} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <FormControl>
                                        <TextField
                                            id="description"
                                            label="Description"
                                            multiline
                                            rows={5}
                                            defaultValue={state.description}
                                            variant="outlined"
                                            onChange={handleChange}
                                            style={{maxWidth:"100vh"}}
                                        />
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <FormControl required error={errorType} component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Pick multiple</FormLabel>
                                        <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={state.checked.core} onChange={handleCheckbox} name="core" />}
                                            label="Core"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.checked.lower_core} onChange={handleCheckbox} name="lower_core" />}
                                            label="Lower Core"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.checked.chest} onChange={handleCheckbox} name="chest" />}
                                            label="Chest"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.checked.obliques} onChange={handleCheckbox} name="obliques" />}
                                            label="Obliques"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.checked.arms} onChange={handleCheckbox} name="arms" />}
                                            label="Arms"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={state.checked.lower_body} onChange={handleCheckbox} name="lower_body" />}
                                            label="Lower Body"
                                        />
                                        </FormGroup>
                                        <FormHelperText>Please select at least one</FormHelperText>
                                    </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                            </Button>
                        </CardActions>
                        
                    </Card>
                </Container>
            </Container>
        </div>
    )
}

const pushNewWorkout = async (newWorkout) =>{
    try{
        let workoutRef = await firebase.database().ref('/workouts');
        var newPostRef = workoutRef.push();
        newPostRef.set(newWorkout)
    }catch(err){
        console.log(err)
    }
}