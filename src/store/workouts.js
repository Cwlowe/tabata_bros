import firebase from '../fire'

//Action types
const SET_WORKOUTS = 'SET_WORKOUTS'
const SET_SESSIONS = 'SET_SESSIONS'

//Initial State
const initialState = {}

//Action Creators
const setWorkouts = (workouts)=>
(
    {
        type: SET_WORKOUTS,
        workouts
    }
)
const setSessions = (sessions)=>
(
    {
        type: SET_SESSIONS,
        sessions
    }
)

export const fetchWorkouts = () =>{
    return async(dispatch) => {
        try {
            let workoutRef = await firebase.database().ref('/workouts');
            workoutRef.on('value',(snap) =>{
                dispatch(setWorkouts(snap.val()))
            })
            
        } catch (err){
          console.log(err)
        }
      }
};
export const fetchSessions= () =>{
    return async(dispatch) => {
        try {
            let workoutRef = await firebase.database().ref('/sessions');
            workoutRef.on('value',(snap) =>{
                dispatch(setSessions(snap.val()))
            })
            
        } catch (err){
          console.log(err)
        }
      }
};

//Reducer
export default function workoutReducer(state = initialState, action){
    switch(action.type){
        case SET_WORKOUTS:
            return {...state, workouts:action.workouts}
        case SET_SESSIONS:
            return {...state, sessions:action.sessions}
        default:
            return state
    }
}