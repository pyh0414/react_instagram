import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  UPLOAD_POST_IMAGE_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
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

// ------------------------------------------------

function addPostAPI(data) {
  return axios.post("/post", data, { withCredentials: true });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

// ------------------------------------------------

function loadMainPostsAPI() {
  return axios.get("/posts", { withCredentials: true });
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE
    });
  }
}

function* watchLoadMainPosts() {
  yield takeEvery(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

// ------------------------------------------------

function likePostAPI(data) {
  return axios.post(`/post/${data}/like`, {}, { withCredentials: true });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    const data = { userId: result.data, postId: action.data };
    yield put({
      type: LIKE_POST_SUCCESS,
      data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE
    });
  }
}

function* watchLikePost() {
  yield takeEvery(LIKE_POST_REQUEST, likePost);
}

// ------------------------------------------------

function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`, { withCredentials: true });
}

function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);
    const data = { userId: result.data, postId: action.data };
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE
    });
  }
}

function* watchUnLikePost() {
  yield takeEvery(UNLIKE_POST_REQUEST, unLikePost);
}

// ------------------------------------------------

function addCommentAPI(data) {
  const { postId, text: comment } = data;
  return axios.post(
    `/post/${postId}/comment`,
    { comment },
    { withCredentials: true }
  );
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE
    });
  }
}

function* wawtchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

// ------------------------------------------------

export default function* postSaga() {
  yield all([
    fork(watchUploadPostImage),
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(wawtchAddComment)
  ]);
}
