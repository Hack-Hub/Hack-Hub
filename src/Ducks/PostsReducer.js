import axios from 'axios'
const NEW_POST = 'NEW_POST'

//initial state
const initialState={
}
//reducer
export default function reducer(state=initialState,action){
    console.log('action: ', action.type);
    switch(action.type){
        case NEW_POST+'_FULFILLED':
            return {...state,user_id:action.payload}
        default:
            return state;
    }
}

//action creator
export function newPost(){
    return{
    type:NEW_POST,
    payload:axios.post()
    }
}
