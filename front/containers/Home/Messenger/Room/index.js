import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

import RoomItem from "./roomItem";
import Head from "./Head";

const Wrapper = styled.div`
  height: 86%;
  overflow: "scroll";
`;

const Room = () => {
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

export default Room;
