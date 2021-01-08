
import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import {fetchWorkouts, fetchSessions} from '../store/workouts';
import firebase from '../fire'
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
// import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop: '10%',
      padding:'3%',
      backgroundColor:"#FEFEFE"
    },
    submitBtn:{
      marginLeft:"5%",
      marginRight:"5%",
      backgroundColor:"#243665",
      color:"#FEFEFE"
    },
    sessionCards:{
        backgroundColor:"#243665",
        marginTop:"5%",
        color:"#8BD8BD"
    },
    text:{
        color:"#243665"
    },
    formTitle:{
        color:"#243665"
    },
    button:{
        color:"#243665",
        backgroundColor:"#8BD8BD"
    },
    revButton:{
        color:"#FEFEFE",
        backgroundColor:"#243665"
    },
  });
 const TabataGeneratorPage = ()=>{
    const [state,setState] = useState({
        listView: true,
        sessions:[]
    })
    const classes = useStyles();
    const workouts = useSelector(state=>state.state.workouts)
    const sessions = useSelector(state=>state.state.sessions)
    
    const dispatch = useDispatch()
    
    const toggleCreateView = () =>{
        setState({...state, listView: !state.listView})
    }

    useEffect(()=>{
        dispatch(fetchWorkouts())
        dispatch(fetchSessions())
    },[dispatch])

    return(
        <div style={{ backgroundColor: '#8BD8BD', height: '100vh', overflowY:"auto"}}>
            <Container maxWidth="xl" style={{ backgroundColor: '#8BD8BD', height: '100vh'}}>
                <Container maxWidth="md" style={{height: '100vh',paddingTop:'3vh',paddingBottom:'3vh' }}>
                   <Grid container justify="center" alignContent="center" spacing={3}>
                       <Grid item xs={12}>
                       <Card className={classes.root} variant="outlined">
                        <CardContent >
                        {state.listView ? 
                            <ListSession toggleCreateView={toggleCreateView} sessions={sessions}/> : 
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
        type:{
            core: false,
            lower_core: false,
            chest: false,
            obliques:false,
            arms:false,
            lower_body:false,
        },
        error: false,
        session:[],
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
        setState({
            ...state, 
            [event.target.id]: event.target.value,

        });
    };

    const handleSubmit=(event)=>{
        if(errorType || errorName){
            setState({...state, error:true})
        }else{
            console.log("Creating session")
            const session = createWorkout(state)
            console.log("Send data: ", session)
            sendData(session);
            setState({
                name:"",
                type:{
                    core: false,
                    lower_core: false,
                    chest: false,
                    obliques:false,
                    arms:false,
                    lower_body:false,
                },
                errorType: true,
                errorName: true,
                error: false,
                session:[]
            })
            props.toggleCreateView()
        }
        
    }
    const createWorkout =(state)=>{
        //create sessions
        
        let workouts = Object.values(props.workouts)
        let session = []
        let types = state.type;
        while(session.length<4){
            let randNum =  Math.floor((Math.random() * workouts.length));
            let workout = workouts[randNum]
            for(let i = 0; i<workout.type.length; i++){
                if(types[workout.type[i]]){
                    
                    session.push(workouts.splice(randNum,1)[0])
                }
            }
        }
        console.log("in CreateWorkout: ", session)
        return session
    }
    const sendData = async (session)=>{
        try{
            let sendData = {
                name:state.name,
                type:state.type,
                session,
            }
            let workoutRef = await firebase.database().ref('/sessions');
            var newPostRef = workoutRef.push();
            newPostRef.set(sendData)
        }catch(err){
            console.log(err)
        }
    }
    const errorType = Object.values(state.type).filter((v)=> v ===true).length === 0;
    const errorName = state.name.length === 0;
    return(
        <>
            <h2 className={classes.formTitle}>
                Create Session View
            </h2>
            {
                state.error ? 
                <Alert severity="error">Please fill out the required fields</Alert>:
                null
            }
            <form >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormControl required error={errorName}>
                            <InputLabel className={classes.text} htmlFor="name">Session Name</InputLabel>
                            <Input id="name" value={state.name} onChange={handleChange} />
                            <FormHelperText>This field is required</FormHelperText>
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
                    <FormControl required error={errorType} className={classes.text} component="fieldset">
                        <FormLabel className={classes.text} component="legend">Select the body part you want to strengthen.</FormLabel>
                        <FormGroup className={classes.text}>
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
                
                <Link className={classes.text} href="#" onClick={props.toggleCreateView}>
                &lt;back
                </Link>
                <Button className={classes.submitBtn} variant="contained" onClick={handleSubmit}>
                Submit
                </Button>
                
            </CardActions>
            
            
        </>
    );
}

const ListSession = (props)=>{
    const classes = useStyles();
    let sessions = props.sessions ? Object.values(props.sessions) : []
    console.log(sessions)
    return(
        <>
            <Grid container>
                <Grid item xs={12}>
                <h1 className={classes.text}>Tabata Generator</h1>
                <p className={classes.text}>Create your own circuit with our generator. Once you have your circuit created, you’ll want to do each move for 20 seconds with a 10 second break and complete each circuit at least 4 times.</p>
                <Button className={classes.button} variant="contained" onClick={props.toggleCreateView}>Create a Random Session</Button>
                </Grid>
                <Grid item xs={12} className={classes.text}>
                    {sessions.length === 0 ? 
                     <h1>There are no sessions right now please create one.</h1> 
                     : 
                    <>
                        <h2>List of Sessions</h2>
                        <Grid container spacing={2}>
                        {sessions.map(sess=>{
                            return(
                                <Grid item xs="4">
                                    <Card className={classes.sessionCards} id={sess.id}>
                                        <CardContent className = {classes.cardContent}>
                                        <h2>{sess.name}</h2>
                                        {sess.session.map((workouts)=>
                                            <p>{workouts.name}</p>
                                        )}
                                        </CardContent>
                                        <CardActions>
                                        <Button variant="contained" className={classes.button} size="small">Join Session</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                        </Grid>
                    </>
                    }
                    
                    
                </Grid>
            </Grid>
        </>
    )
}




export default TabataGeneratorPage;