import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  MAKE_ROOM_REQUEST,
  MAKE_ROOM_SUCCESS,
  MAKE_ROOM_FAILURE
} from "../reducer/chat";

function makeRoomAPI(text) {
  return axios.post("/room", { text }, { withCredentials: true });
}

function* makeRoom(action) {
  try {
    yield call(makeRoomAPI, action.data);
    // yield put({
    //   type: MAKE_ROOM_SUCCESS,
    //   data: result.data
    // });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAKE_ROOM_FAILURE
    });
  }
}

function* watchMakeRoom() {
  yield takeEvery(MAKE_ROOM_REQUEST, makeRoom);
}

// ------------------------------------------------

export default function* postSaga() {
  yield all([fork(watchMakeRoom)]);
}
