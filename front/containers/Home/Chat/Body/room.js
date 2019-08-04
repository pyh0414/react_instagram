import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import { REMOVE_ROOM_SUCCESS } from "../../../../reducer/chat";

const Wrapper = styled.div`
  font-style: "bold";
  border-bottom: 1px solid #e6e6e6;
  padding: 8px;
`;

const Room = ({ room }) => {
  const { user } = useSelector(state => state.user);

  const onRemoveRoom = useCallback(roomId => async () => {
    await axios.delete(`/room/${roomId}`, { withCredentials: true });
  });

  return (
    <Wrapper>
      <span>{room.name}</span>
      {user && user.id === room.master ? (
        <>
          <Button style={{ float: "right" }} type="primary" size="small">
            입장
          </Button>
          <Button
            style={{ float: "right", marginRight: "6px" }}
            type="danger"
            size="small"
            onClick={onRemoveRoom(room.id)}
          >
            방삭제
          </Button>
        </>
      ) : (
        <Button style={{ float: "right" }} type="primary" size="small">
          입장
        </Button>
      )}
    </Wrapper>
  );
};
export default Room;
