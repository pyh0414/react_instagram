import produce from "immer";
import io from "socket.io-client";

export const initialState = {
  roomSocket: null,
  chatSocket: null,
  rooms: [],
  currentRoom: false
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

export const ENTER_ROOM_REQUEST = "ENTER_ROOM_REQUEST";
export const ENTER_ROOM_SUCCESS = "ENTER_ROOM_SUCCESS";
export const ENTER_ROOM_FAILURE = "ENTER_ROOM_FAILURE";

export const OUT_ROOM_REQUEST = "OUT_ROOM_REQUEST";
export const OUT_ROOM_SUCCESS = "OUT_ROOM_SUCCESS";
export const OUT_ROOM_FAILURE = "OUT_ROOM_FAILURE";

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const CONNECT_SOCKET_REQUEST = "CONNECT_SOCKET_REQUEST";

export const CONNECT_CAHT_SOCKET_REQUEST = "CONNECT_CAHT_SOCKET_REQUEST";
export const DISCONNECT_CAHT_SOCKET_REQUEST = "DISCONNECT_CAHT_SOCKET_REQUEST";

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case CONNECT_SOCKET_REQUEST: {
        draft.roomSocket = io("localhost:3060/room");
        draft.chatSocket = io("localhost:3060/chat");
        break;
      }
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

      case ENTER_ROOM_SUCCESS: {
        const { id, Chats } = action.data;

        draft.currentRoom = { roomId: id };
        draft.currentRoom.chats = Chats;
        break;
      }

      case OUT_ROOM_SUCCESS: {
        draft.currentRoom = null;
        break;
      }

      case SEND_MESSAGE_SUCCESS: {
        const { chat, user } = action.data;
        const { id: chatId, content } = chat;
        if (draft.currentRoom) {
          draft.currentRoom.chats.push({ content, id: chatId, User: user });
        }
        break;
      }
    }
  });
};
