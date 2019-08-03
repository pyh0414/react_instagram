import { all, fork } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3060";

import user from "./user";
import post from "./post";
import chat from "./chat";

export default function* rootSaga() {
  yield all([fork(user), fork(post), fork(chat)]);
}
