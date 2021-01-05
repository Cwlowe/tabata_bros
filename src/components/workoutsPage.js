
import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import {fetchWorkouts} from '../store/workouts';
//Material Ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop: '10%',
      padding:'3%'
    },
    submitBtn:{
      marginLeft:"5%",
      marginRight:"5%"
    }
  });
 const WorkoutsPage = ()=>{
    const [state,setState] = useState({
        listView: true,
        sessions:[]
    })
    const classes = useStyles();
    const workouts = Object.values(useSelector(state=>state.workoutReducer))
    const dispatch = useDispatch()
    
    const toggleCreateView = () =>{
        setState({...state, listView: !state.listView})
    }

    useEffect(()=>{
        dispatch(fetchWorkouts())
        
    },[dispatch])

    return(
        <div style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                <Container maxWidth="md" style={{height: '100vh',paddingTop:'3vh' }}>
                   <Grid container justify="center" alignContent="center" spacing={3}>
                       <Grid item xs={12}>
                       <Card className={classes.root} variant="outlined">
                        <CardContent >
                        {state.listView ? 
                            <ListSession toggleCreateView={toggleCreateView} sessions={state.sessions}/> : 
                            <CreateSession toggleCreateView={toggleCreateView} workouts={workouts}/>
                        }  
                        </CardContent>
                    </Card>
                       </Grid>
                   </Grid>
                </Container>
            </Container>
        </div>
    )
}

const CreateSession = (props)=>{
    const [state,setState] = useState({
        name:"",
        description:"",
        type:{
            core: false,
            lower_core: false,
            chest: false,
            obliques:false,
            arms:false,
            lower_body:false,
        }
    })
    const classes = useStyles();

    const handleCheckbox = (event) => {
        setState({ 
            ...state, 
            type: {
                ...state.type,
                [event.target.name]: event.target.checked 
            }
        });
    }

    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value});
    };

    const handleSubmit=(event)=>{
        
        setState({
            name:"",
            description:"",
            type:{
                core: false,
                lower_core: false,
                chest: false,
                obliques:false,
                arms:false,
                lower_body:false,
            }
        })
    }
    const error = Object.values(state.type).filter((v) => v === true).length === 0;
    return(
        <>
            <div>
                Create Session View
            </div>
            <form >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormControl>
                            <InputLabel htmlFor="name">Session Name</InputLabel>
                            <Input id="name" value={state.name} onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={6}>
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
                    </Grid> */}
                    <Grid item xs={12}>
                    <FormControl required error={error} component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Pick types you want to work on.</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={state.type.core} onChange={handleCheckbox} name="core" />}
                            label="Core"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.type.lower_core} onChange={handleCheckbox} name="lower_core" />}
                            label="Lower Core"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.type.chest} onChange={handleCheckbox} name="chest" />}
                            label="Chest"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.type.obliques} onChange={handleCheckbox} name="obliques" />}
                            label="Obliques"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.type.arms} onChange={handleCheckbox} name="arms" />}
                            label="Arms"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.type.lower_body} onChange={handleCheckbox} name="lower_body" />}
                            label="Lower Body"
                        />
                        </FormGroup>
                        <FormHelperText>Please select at least one</FormHelperText>
                    </FormControl>
                    </Grid>
                </Grid>
            </form>
            <CardActions>
                <Link href="#" onClick={props.toggleCreateView}>
                &lt;back
                </Link>
                <Button className={classes.submitBtn} variant="contained" color="primary" onClick={handleSubmit}>
                Submit
                </Button>
                
            </CardActions>
            
            
        </>
    );
}
const ListSession = (props)=>{
    const classes = useStyles();
    console.log(props.sessions.length)
    const listSessions = (
        <>
        <h1>List of Sessions</h1>
        {props.sessions.map(sess=>{
            return(
                <div>{sess}</div>
            )
        })}
        </>
    )
    

    return(
        <>
            <Grid container>
                <Grid item xs={12}>
                <Button className={classes.button} variant="contained" color="primary" onClick={props.toggleCreateView}>Create a Random Session</Button>
                </Grid>
                <Grid item xs={12}>
                    {props.sessions.length == 0 ? 
                     <h1>There are no sessions right now please create one.</h1> 
                     : 
                     {listSessions}
                    }
                    
                    
                </Grid>
            </Grid>
        </>
    )
}




export default WorkoutsPage;