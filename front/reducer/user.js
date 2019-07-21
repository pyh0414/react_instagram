import produce from "immer";

export const initialState = {
  user: null, // 현재 내 사용자 정보, 로그인/로그아웃 여부
  isExistingId: false, // 아이디 중복확인(회원가입할 때 사용)
  profileImage: "", //  사용자 프로필 이미지(회원가입할 떄 사용)

  hasLoginRequestFinished: false, // 로그인 요청이 끝났는지

  isSignedUpSuccess: false, // 회원가입 성공여부
  hasIdCheckRequestFinished: false // 회원가입 요청이 끝났는지
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const EXISTING_ID_CHECK_REQUEST = "ID_CHECEK_REQUEST";
export const EXISTING_ID_CHECK_SUCCESS = "ID_CHECEK_SUCCESS";
export const EXISTING_ID_CHECK_FAILURE = "ID_CHECEK_FAILURE";

export const UPLOAD_PROFILE_IMAGE_REQUEST = "UPLOAD_PROFILE_REQUEST";
export const UPLOAD_PROFILE_IMAGE_SUCCESS = "UPLOAD_PROFILE_SUCCESS";
export const UPLOAD_PROFILE_IMAGE_FAILURE = "UPLOAD_PROFILE_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const CLEAR_LOGIN_STATUS_REQUEST = "CLEAR_LOGIN_STATUS_REQUEST";

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_SUCCESS: {
        draft.isSignedUpSuccess = true;
        draft.hasIdCheckRequestFinished = false;
        draft.isExistingId = false;
        draft.profileImage = "";
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSignedUpSuccess = false;
        break;
      }
      case LOG_IN_REQUEST: {
        (draft.hasLoginRequestFinished = false),
          (draft.isLogoutSuccess = false);
        break;
      }
      case LOG_IN_SUCCESS: {
        (draft.user = action.data), (draft.hasLoginRequestFinished = true);
        break;
      }
      case LOG_IN_FAILURE: {
        (draft.user = null), (draft.hasLoginRequestFinished = true);
        break;
      }
      case LOG_OUT_REQUEST: {
        (draft.isLogoutSuccess = false),
          (draft.hasLoginRequestFinished = false);
        break;
      }
      case LOG_OUT_SUCCESS: {
        (draft.user = null), (draft.isLogoutSuccess = true);
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.hasLoginRequestFinished = true;
        break;
      }
      case EXISTING_ID_CHECK_SUCCESS: {
        draft.isExistingId = true;
        draft.hasIdCheckRequestFinished = true;
        break;
      }
      case EXISTING_ID_CHECK_FAILURE: {
        draft.isExistingId = false;
        draft.hasIdCheckRequestFinished = true;
        break;
      }
      case UPLOAD_PROFILE_IMAGE_SUCCESS: {
        draft.profileImage = action.data;
        break;
      }
      case UPLOAD_PROFILE_IMAGE_SUCCESS: {
        draft.profileImage = "";
        break;
      }
    }
  });
};
