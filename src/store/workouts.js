import firebase from '../fire'

//Action types
const SET_WORKOUTS = 'SET_WORKOUTS'

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

//Reducer
export default function workoutReducer(state = initialState, action){
    switch(action.type){
        case SET_WORKOUTS:
            return action.workouts
        default:
            return state
    }
}