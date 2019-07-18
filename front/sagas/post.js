import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  UPLOAD_POST_IMAGE_FAILURE
} from "../reducer/post";

function uploadPostImageAPI(data) {
  return axios.post("/post/image", data);
}

function* uploadPostImage(action) {
  try {
    const result = yield call(uploadPostImageAPI, action.data);
    yield put({
      type: UPLOAD_POST_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_POST_IMAGE_FAILURE
    });
  }
}

function* watchUploadPostImage() {
  yield takeEvery(UPLOAD_POST_IMAGE_REQUEST, uploadPostImage);
}

export default function* postSaga() {
  yield all([fork(watchUploadPostImage)]);
}
