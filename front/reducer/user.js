import produce from "immer";

export const initialState = {
  user: null,
  isLoginSuccess: false,
  hasLoginRequestFinished: false,
  isSignedUpSuccess: false,
  hasIdChecked: false,
  isExistingId: false,
  profileImage: ""
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

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_SUCCESS: {
        draft.isSignedUpSuccess = true;
        draft.hasIdChecked = false;
        draft.isExistingId = false;
        draft.profileImage = "";
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSignedUpSuccess = false;
        break;
      }
      case LOG_IN_REQUEST: {
        (draft.hasLoginRequestFinished = false), (draft.isLoginSuccess = false);
        break;
      }
      case LOG_IN_SUCCESS: {
        (draft.user = action.data),
          (draft.hasLoginRequestFinished = true),
          (draft.isLoginSuccess = true);
        break;
      }
      case LOG_IN_FAILURE: {
        (draft.user = null),
          (draft.hasLoginRequestFinished = true),
          (draft.isLoginSuccess = false);
        break;
      }
      case EXISTING_ID_CHECK_SUCCESS: {
        draft.isExistingId = true;
        draft.hasIdChecked = true;
        break;
      }
      case EXISTING_ID_CHECK_FAILURE: {
        draft.isExistingId = false;
        draft.hasIdChecked = true;
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
