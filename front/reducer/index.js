import { combineReducers } from "redux";

import user from "./user.js";
import post from "./post.js";
import chat from "./chat";

const rootReducer = combineReducers({
  user,
  post,
  chat
});

export default rootReducer;
