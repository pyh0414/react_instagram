import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_IN_FAILURE,
	EXISTING_ID_CHECK_REQUEST,
	EXISTING_ID_CHECK_SUCCESS,
	EXISTING_ID_CHECK_FAILURE,
	UPLOAD_PROFILE_IMAGE_REQUEST,
	UPLOAD_PROFILE_IMAGE_FAILURE,
	UPLOAD_PROFILE_IMAGE_SUCCESS,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	LOG_OUT_FAILURE,
	FOLLOW_USER_REQUEST,
	FOLLOW_USER_SUCCESS,
	FOLLOW_USER_FAILURE,
	UNFOLLOW_USER_REQUEST,
	UNFOLLOW_USER_SUCCESS,
	UNFOLLOW_USER_FAILURE,
	LOAD_MY_POSTS_SUCCESS,
	LOAD_MY_POSTS_REQUEST,
	LOAD_MY_POSTS_FAILURE
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
	return axios.post("http://localhost:3060/user/login", data);
}

function* logIn(action) {
	try {
		const result = yield call(logInAPI, action.data);
		if (result) {
			yield put({
				type: LOG_IN_SUCCESS,
				data: result.data
			});
		}
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
		const result = yield call(idCheckAPI, action.data);
		if (result.data) {
			yield put({
				type: EXISTING_ID_CHECK_SUCCESS // 중복된 아이디가 발견된 경우
			});
		} else {
			yield put({
				type: EXISTING_ID_CHECK_FAILURE // 중복된 아이디가 발견된 경우
			});
		}
	} catch (err) {
		console.error(err);
	}
}

function* watchIdCheck() {
	yield takeEvery(EXISTING_ID_CHECK_REQUEST, idCheck);
}

//-------------------------------------------------------
function uploadProfileImageAPI(data) {
	return axios.post("/user/image", data);
}

function* uploadProfileImage(action) {
	try {
		const result = yield call(uploadProfileImageAPI, action.data);

		yield put({
			type: UPLOAD_PROFILE_IMAGE_SUCCESS,
			data: result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UPLOAD_PROFILE_IMAGE_FAILURE
		});
	}
}

function* watchUploadProfileImage() {
	yield takeEvery(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage);
}

//-------------------------------------------------------

function logOutAPI(data) {
	return axios.post("/user/logout", data);
}

function* logOut(action) {
	try {
		yield call(logOutAPI);
		yield put({
			type: LOG_OUT_SUCCESS
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOG_OUT_FAILURE
		});
	}
}

function* watchLogOut() {
	yield takeEvery(LOG_OUT_REQUEST, logOut);
}

//-------------------------------------------------------

function followAPI(userId) {
	return axios.post(`/user/${userId}/follow`, {}, { withCredentials: true });
}

function* follow(action) {
	try {
		const result = yield call(followAPI, action.data);
		yield put({
			type: FOLLOW_USER_SUCCESS,
			data: result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: FOLLOW_USER_FAILURE
		});
	}
}

function* watchFollow() {
	yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

//-------------------------------------------------------

function unFollowAPI(userId) {
	return axios.delete(`/user/${userId}/follow`, { withCredentials: true });
}

function* unFollow(action) {
	try {
		const result = yield call(unFollowAPI, action.data);
		yield put({
			type: UNFOLLOW_USER_SUCCESS,
			data: result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UNFOLLOW_USER_FAILURE
		});
	}
}

function* watchUnFollow() {
	yield takeEvery(UNFOLLOW_USER_REQUEST, unFollow);
}

//-------------------------------------------------------

function loadMyPostAPI() {
	return axios.get(`/user/posts`, { withCredentials: true });
}

function* loadMyPost(action) {
	try {
		const result = yield call(loadMyPostAPI);
		yield put({
			type: LOAD_MY_POSTS_SUCCESS,
			data: result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_MY_POSTS_FAILURE
		});
	}
}

function* watchLoadMyPost() {
	yield takeEvery(LOAD_MY_POSTS_REQUEST, loadMyPost);
}

//-------------------------------------------------------

export default function* userSaga() {
	yield all([
		fork(watchSignUp),
		fork(watchLogIn),
		fork(watchIdCheck),
		fork(watchUploadProfileImage),
		fork(watchLogOut),
		fork(watchFollow),
		fork(watchUnFollow),
		fork(watchLoadMyPost)
	]);
}
