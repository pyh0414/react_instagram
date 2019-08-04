import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useDispatch } from "react-redux";

import RoomItem from "./roomItem";
import Head from "./Head";

import { REMOVE_ROOM_SUCCESS } from "../../../../reducer/chat";

const Wrapper = styled.div`
  height: 86%;
  overflow: "scroll";
`;

const Index = () => {
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
    <>
      <Head />
      <Wrapper>
        {rooms &&
          rooms.map((v, i) => {
            return <RoomItem room={v} key={v.id} />;
          })}
      </Wrapper>
    </>
  );
};

export default Index;
