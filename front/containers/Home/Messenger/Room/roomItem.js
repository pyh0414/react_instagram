import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useSelector } from "react-redux";
import { Button } from "antd";

const Wrapper = styled.div`
  font-style: "bold";
  border-bottom: 1px solid #e6e6e6;
  padding: 8px;
`;

const Room = ({ room }) => {
  const { user } = useSelector(state => state.user);
  const { roomSocket } = useSelector(state => state.chat);

  const onRemoveRoom = useCallback(
    roomId => () => {
      axios.delete(`/room/${roomId}`, { withCredentials: true });
    },
    []
  );

  const onEnterRoom = useCallback(
    roomId => () => {
      axios
        .post(`/room/${roomId}/enter`, {}, { withCredentials: true })
        .then(room => {
          roomSocket.emit("enter_room_request", room.data.room);
        });
    },
    []
  );

  return (
    <Wrapper>
      <span>{room.name}</span>
      {user && user.id === room.master ? (
        <>
          <Button
            style={{ float: "right" }}
            type="primary"
            size="small"
            onClick={onEnterRoom(room.id)}
          >
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
        <Button
          style={{ float: "right" }}
          type="primary"
          size="small"
          onClick={onEnterRoom(room.id)}
        >
          입장
        </Button>
      )}
    </Wrapper>
  );
};
export default Room;
