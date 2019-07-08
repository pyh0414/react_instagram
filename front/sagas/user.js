import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  ID_CHECK_REQUEST,
  ID_CHECK_SUCCESS,
  ID_CHECK_FAILURE
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
function idCheckAPI(data) {
  return axios.get(`/user/check?userId=${data.id}`);
}

function* idCheck(action) {
  try {
    yield call(idCheckAPI, action.data);
    yield put({
      type: ID_CHECK_SUCCESS // 중복된 아이디가 발견된 경우
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ID_CHECK_FAILURE // 중복된 아이디가 발견되지 않은 경우
    });
  }
}

function* watchIdCheck() {
  yield takeEvery(ID_CHECK_REQUEST, idCheck);
}

//-------------------------------------------------------

export default function* userSage() {
  yield all([fork(watchSignUp), fork(watchLogIn), fork(watchIdCheck)]);
}
