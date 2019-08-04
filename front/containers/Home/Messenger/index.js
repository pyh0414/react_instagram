import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Room from "./Room";
import Chat from "./Chat";

const Wrapper = styled.div`
  margin-top: 30px;
  border: 2px solid #e6e6e6;
  height: 500px;
  border-radius: 2%;
`;
const Messenger = () => {
  const { inRoom } = useSelector(state => state.chat);
  return <Wrapper>{inRoom ? <Chat /> : <Room />}</Wrapper>;
};

export default Messenger;
