import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  REMOVE_ROOM_SUCCESS,
  MAKE_ROOM_SUCCESS,
  ENTER_ROOM_SUCCESS,
  OUT_ROOM_SUCCESS,
  SEND_MESSAGE_SUCCESS
} from "../../../reducer/chat";
import Room from "./Room";
import Chat from "./Chat";

const Wrapper = styled.div`
  margin-top: 30px;
  border: 2px solid #e6e6e6;
  height: 500px;
  border-radius: 2%;
`;
const Messenger = () => {
  const dispatch = useDispatch();
  const { roomSocket } = useSelector(state => state.chat);

  useEffect(() => {
    roomSocket.on("remove_room_success", roomId => {
      dispatch({
        type: REMOVE_ROOM_SUCCESS,
        data: roomId
      });
    });

    roomSocket.on("make_room_success", room => {
      const { id, name, master } = room;
      dispatch({
        type: MAKE_ROOM_SUCCESS,
        data: { id, name, master }
      });
    });

    roomSocket.on("send_message_success", data => {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        data
      });
    });

    roomSocket.on("enter_room_success", room => {
      console.log("dispatch ", room.Chats);
      dispatch({
        type: ENTER_ROOM_SUCCESS,
        data: room
      });
    });
    roomSocket.on("out_room_success", () => {
      dispatch({
        type: OUT_ROOM_SUCCESS
      });
    });
  }, []);

  const { currentRoom } = useSelector(state => state.chat);
  return <Wrapper>{currentRoom ? <Chat /> : <Room />}</Wrapper>;
};

export default Messenger;
