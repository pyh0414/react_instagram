import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDispatch } from "react-redux";

import Room from "./room";

import { REMOVE_ROOM_SUCCESS } from "../../../../reducer/chat";
const Wrapper = styled.div`
  height: 86%;
  overflow: "scroll";
`;

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const roomSocket = io("localhost:3060/room");
    roomSocket.on("remove_room_success", roomId => {
      dispatch({
        type: REMOVE_ROOM_SUCCESS,
        data: roomId
      });
    });
    return () => {
      roomSocket.close();
    };
  }, []);

  const { rooms } = useSelector(state => state.chat);
  return (
    <Wrapper>
      {rooms &&
        rooms.map((v, i) => {
          return <Room room={v} key={v.id} />;
        })}
    </Wrapper>
  );
};

export default Body;
