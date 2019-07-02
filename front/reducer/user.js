import produce from "immer";

export const initialState = {
  user: null,
  isSignedUpSuccess: false
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

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
    }
  });
};
