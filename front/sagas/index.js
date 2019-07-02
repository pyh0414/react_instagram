import { all, fork } from "redux-saga/effects";
import user from "./user";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3060";

export default function* rootSage() {
  yield all([fork(user)]);
}
