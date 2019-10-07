import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, Input, message } from "antd";

const Wrapper = styled.div`
  display: flex;
  height: 7%;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
`;

const Head = () => {
  const [roomName, setRoomName] = useState("");

  const onChnageRoomName = useCallback(e => {
    setRoomName(e.target.value);
  }, []);

  const onMakeRoom = useCallback(() => {
    if (roomName.trim() == "") {
      return message.error("채팅방 이름을 입력해 주세요 !");
    }

    axios.post("/room", { roomName }, { withCredentials: true });

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
