import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../reducer/user";

function signUpAPI(data) {
  return axios.post("http://localhost:3060/user", data);
}

function* signUp(action) {
  try {
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
export default function* userSage() {
  yield all([fork(watchSignUp)]);
}
