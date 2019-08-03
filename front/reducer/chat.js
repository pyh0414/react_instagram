import produce from "immer";

export const initialState = {
  rooms: []
};

export const MAKE_ROOM_REQUEST = "MAKE_ROOM_REQUEST";
export const MAKE_ROOM_SUCCESS = "MAKE_ROOM_SUCCESS";
export const MAKE_ROOM_FAILURE = "MAKE_ROOM_FAILURE";

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case MAKE_ROOM_SUCCESS: {
        draft.rooms.push(action.data);
        break;
      }
    }
  });
};
