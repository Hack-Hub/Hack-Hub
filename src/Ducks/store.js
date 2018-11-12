import {createStore,applyMiddleware,combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import CommentsReducer from './CommentsReducer'
import MessagesReducer from './MessagesReducer'
import PostsReducer from './PostsReducer'
import SubHubReducer from './UserReducer'



let allReducers = combineReducers({Comments:CommentsReducer,Messages:MessagesReducer,Posts:PostsReducer,SubHub:SubHubReducer,User:UserReducer})

let store = createStore(allReducers,applyMiddleware(promiseMiddleware()))

export default store;