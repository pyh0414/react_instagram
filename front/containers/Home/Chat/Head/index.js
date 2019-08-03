import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { Button, Input } from "antd";

import { MAKE_ROOM_REQUEST, MAKE_ROOM_SUCCESS } from "../../../../reducer/chat";
// import { roomSocket } from "../../../../utils/socket";
const Wrapper = styled.div`
  display: flex;
  height: 7%;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
`;

const Head = () => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  let roomSocket;

  useEffect(() => {
    roomSocket = io("localhost:3060/room");
    roomSocket.on("room_make_success", newRoom => {
      if (newRoom) {
        const { id, name, master } = newRoom;
        dispatch({
          type: MAKE_ROOM_SUCCESS,
          data: { id, name, master }
        });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      roomSocket.close();
    };
  }, []);

  const onChnageRoomName = useCallback(e => {
    setRoomName(e.target.value);
  }, []);

  const onMakeRoom = useCallback(() => {
    dispatch({
      type: MAKE_ROOM_REQUEST,
      data: roomName
    });
    setRoomName("");
  }, [roomName]);
  return (
    <Wrapper>
      <Input
        value={roomName}
        onChange={onChnageRoomName}
        placeholder="방 이름을 적어주세요"
      />
      <Button style={{ width: "40%", heigth: "100%" }} onClick={onMakeRoom}>
        방생성
      </Button>
    </Wrapper>
  );
};

export default Head;
