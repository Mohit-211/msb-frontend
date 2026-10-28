import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import likesReducer from "./slices/likesSlice";
import commentsReducer from "./slices/commentsSlice";
import storyHistoryReducer from "./slices/storyHistorySlice";

const rootReducer = combineReducers({
  clientProfile: profileReducer,
  like: likesReducer,
  comment: commentsReducer,
  storyHistory: storyHistoryReducer,
});

export default rootReducer;
