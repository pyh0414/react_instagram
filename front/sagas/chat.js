import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_CHAT_ROOM_REQUEST,
  LOAD_CHAT_ROOM_SUCCESS,
  LOAD_CHAT_ROOM_FAILURE
} from "../reducer/chat";

function loadRoomAPI() {
  return axios.get("/rooms", { withCredentials: true });
}

function* loadRoom() {
  try {
    const result = yield call(loadRoomAPI);
    yield put({
      type: LOAD_CHAT_ROOM_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CHAT_ROOM_FAILURE
    });
  }
}

function* watchLoadRoom() {
  yield takeEvery(LOAD_CHAT_ROOM_REQUEST, loadRoom);
}

// ------------------------------------------------

export default function* postSaga() {
  yield all([fork(watchLoadRoom)]);
}
