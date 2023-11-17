import { combineReducers } from "redux";
import userReducer from "../slice/userSlice";
import blogReducer from "../slice/blogSlice";

const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
});

export default rootReducer;
