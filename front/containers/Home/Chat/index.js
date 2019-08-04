import React, { useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import Input from "./Input";
import Head from "./Head";
import Body from "./Body";

const Wrapper = styled.div`
  margin-top: 30px;
  border: 2px solid #e6e6e6;
  height: 500px;
  border-radius: 2%;
`;
const Chat = () => {
  return (
    <Wrapper>
      <Head />
      <Body />
      {/* <Input /> */}
    </Wrapper>
  );
};

export default Chat;
