import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import { ENTER_ROOM_REQUEST } from "../../../../reducer/chat";

const Wrapper = styled.div`
  font-style: "bold";
  border-bottom: 1px solid #e6e6e6;
  padding: 8px;
`;

const Room = ({ room }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onRemoveRoom = useCallback(roomId => async () => {
    await axios.delete(`/room/${roomId}`, { withCredentials: true });
  });

  const onEnterRoom = useCallback(
    roomId => () => {
      dispatch({
        type: ENTER_ROOM_REQUEST,
        data: roomId
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
        <Button style={{ float: "right" }} type="primary" size="small">
          입장
        </Button>
      )}
    </Wrapper>
  );
};
export default Room;
