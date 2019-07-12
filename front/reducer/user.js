import produce from "immer";

export const initialState = {
  user: null,
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

export const UPLOAD_PROFILE_REQUEST = "UPLOAD_PROFILE_REQUEST";
export const UPLOAD_PROFILE_SUCCESS = "UPLOAD_PROFILE_SUCCESS";
export const UPLOAD_PROFILE_FAILURE = "UPLOAD_PROFILE_FAILURE";

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST: {
        (draft.isSigningUp = false),
          (draft.isSignedUpSuccess = false),
          (draft.isSigningUp = true);
        break;
      }
      case SIGN_UP_SUCCESS: {
        (draft.isSigningUp = false), (draft.isSignedUpSuccess = true);
        break;
      }
      case SIGN_UP_FAILURE: {
        (draft.isSigningUp = false), (draft.isSignedUpSuccess = false);
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.user = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.user = null;
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
      case UPLOAD_PROFILE_SUCCESS: {
        draft.profileImage = action.data;
        break;
      }
      case UPLOAD_PROFILE_SUCCESS: {
        draft.profileImage = "";
        break;
      }
    }
  });
};
