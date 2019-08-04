import produce from "immer";

export const initialState = {
  rooms: []
};

export const MAKE_ROOM_REQUEST = "MAKE_ROOM_REQUEST";
export const MAKE_ROOM_SUCCESS = "MAKE_ROOM_SUCCESS";
export const MAKE_ROOM_FAILURE = "MAKE_ROOM_FAILURE";

export const LOAD_CHAT_ROOM_REQUEST = "LOAD_CHAT_ROOM_REQUEST";
export const LOAD_CHAT_ROOM_SUCCESS = "LOAD_CHAT_ROOM_SUCCESST";
export const LOAD_CHAT_ROOM_FAILURE = "LOAD_CHAT_ROOM_FAILURE";

export const REMOVE_ROOM_REQUEST = "REMOVE_ROOM_REQUEST";
export const REMOVE_ROOM_SUCCESS = "REMOVE_ROOM_SUCCESS";
export const REMOVE_ROOM_FAILURE = "REMOVE_ROOM_FAILURE";

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case MAKE_ROOM_SUCCESS: {
        draft.rooms.push(action.data);
        break;
      }
      case LOAD_CHAT_ROOM_SUCCESS: {
        draft.rooms = action.data;
        break;
      }

      case REMOVE_ROOM_SUCCESS: {
        const roomId = action.data;
        const index = draft.rooms.findIndex(v => {
          if (v.id == roomId) {
            return v.id;
          }
        });

        const filteredRoom = draft.rooms.filter((v, i) => {
          if (index != i) {
            return v;
          }
        });
        draft.rooms = filteredRoom;
        break;
      }
    }
  });
};
