import React, { useState, useCallback, useEffect } from "react";
import { Col, Input, Icon } from "antd";
import styled from "styled-components";
import Router from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { LOG_OUT_REQUEST } from "../../reducer/user";

import PostFormModal from "./PostFormModal";
const HeaderWrapper = styled.div`
  height: 55px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InstagramLogo = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  margin: 0px auto;
  cursor: pointer;
`;

const Search = styled.div`
  width: 70%;
  display: block;
  margin: 0px auto;
`;

const Header = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const dispatch = useDispatch();

  const { roomSocket, chatSocket } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    !user && Router.push("/");
  }, [user]);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
    roomSocket && roomSocket.close();
    chatSocket && chatSocket.close();
  }, []);

  return (
    <HeaderWrapper>
      <Col xs={5} md={7}>
        <InstagramLogo
          src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png"
          onClick={() => {
            return Router.push("/home");
          }}
        />
      </Col>
      <Col xs={10} md={7}>
        <Search>
          <Input.Search size="small" style={{ width: "70%" }} />
        </Search>
      </Col>
      <Col xs={5} md={9}>
        <>
          <Col xs={6} md={3}>
            <Icon
              type="user"
              style={{ fontSize: "23px" }}
              onClick={() => {
                return Router.push("/profile");
              }}
            />
          </Col>
          <Col xs={6} md={3}>
            <Icon type="heart" style={{ fontSize: "23px" }} />
          </Col>
          <Col xs={6} md={3}>
            <Icon
              type="form"
              style={{ fontSize: "23px" }}
              onClick={() => {
                setmodalVisible(true);
              }}
            />
          </Col>
          <Col xs={6} md={3}>
            <Icon
              type="logout"
              style={{ fontSize: "23px" }}
              onClick={onLogout}
            />
          </Col>
        </>
      </Col>
      {modalVisible && <PostFormModal setmodalVisibleProps={setmodalVisible} />}
    </HeaderWrapper>
  );
};

export default Header;
