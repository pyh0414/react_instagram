import produce from "immer";

export const initialState = {
  imagePaths: [],
  mainPosts: [],
  isAddingPost: false,
  addPostResult: false
};

export const UPLOAD_POST_IMAGE_REQUEST = "UPLOAD_POST_REQUEST";
export const UPLOAD_POST_IMAGE_SUCCESS = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_IMAGE_FAILURE = "UPLOAD_POST_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const CLEAR_POST_IMAGEPATH_REQUEST =
  "CLEAR_CLEAR_POST_IMAGEPATH_REQUEST";
export const DELETE_POST_IMAGE_REQUEST = "DELETE_POST_IMAGE_REQUEST";
export const CLEAR_POST_FORM_STATUS = "CLEAR_POST_FORM_STATUS";

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case UPLOAD_POST_IMAGE_SUCCESS: {
        action.data.forEach(v => {
          draft.imagePaths.push(v);
        });
        break;
      }

      case CLEAR_POST_IMAGEPATH_REQUEST: {
        draft.imagePaths = [];
        break;
      }

      case DELETE_POST_IMAGE_REQUEST: {
        const index = action.data;
        const filteredImagePaths = state.imagePaths.filter((v, i) => {
          if (i != index) {
            return v;
          }
        });
        draft.imagePaths = filteredImagePaths;
        break;
      }

      case ADD_POST_REQUEST: {
        draft.isAddingPost = true;
        draft.addPostResult = false;
        break;
      }

      case ADD_POST_SUCCESS: {
        draft.mainPosts.push(action.data);
        draft.addPostResult = true;
        draft.isAddingPost = false;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.addPostResult = false;
        draft.isAddingPost = false;
        break;
      }

      case CLEAR_POST_FORM_STATUS: {
        draft.addPostResult = false;
        break;
      }
    }
  });
};
