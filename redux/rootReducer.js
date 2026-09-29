// rootReducer.js
import { combineReducers } from "redux";
import getClientProfileReducer from './getClientProfileSlice';
import getLikeReducer from "./getlikeslice"
import getBlogDetail from "./getBlogSlice"
import getcomment from "./getcommentSlice";
import storyHistoryReducer from './storyHistorySlice';
const rootReducer = combineReducers({
  clientProfile: getClientProfileReducer,
  like: getLikeReducer,
  blogs: getBlogDetail,
  comment: getcomment,
  storyHistory: storyHistoryReducer


});

export default rootReducer;
