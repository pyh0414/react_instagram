import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  MAKE_ROOM_REQUEST,
  MAKE_ROOM_FAILURE,
  LOAD_CHAT_ROOM_REQUEST,
  LOAD_CHAT_ROOM_SUCCESS,
  LOAD_CHAT_ROOM_FAILURE,
  REMOVE_ROOM_REQUEST,
  REMOVE_ROOM_SUCCESS,
  REMOVE_ROOM_FAILURE
} from "../reducer/chat";

function makeRoomAPI(text) {
  return axios.post("/room", { text }, { withCredentials: true });
}

function* makeRoom(action) {
  try {
    yield call(makeRoomAPI, action.data);
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
function removeRoomAPI(roomId) {
  return axios.delete(`/room/${roomId}`, { withCredentials: true });
}

function* removeRoom(action) {
  try {
    yield call(removeRoomAPI, action.data);
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_ROOM_FAILURE
    });
  }
}

function* watchRemoveRoom() {
  yield takeEvery(REMOVE_ROOM_REQUEST, removeRoom);
}

// ------------------------------------------------

export default function* postSaga() {
  yield all([fork(watchMakeRoom), fork(watchLoadRoom), fork(watchRemoveRoom)]);
}
