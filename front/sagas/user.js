import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
} from "../reducer/user";

function signUpAPI(data) {
  return axios.post("http://localhost:3060/user", data);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
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

//-------------------------------------------------------

function logInAPI(data) {
  return axios.post("http://localhost:3060/user/login", data, {
    withCredentials: true
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

//-------------------------------------------------------

export default function* userSage() {
  yield all([fork(watchSignUp), fork(watchLogIn)]);
}
