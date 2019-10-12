import React, { useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

import PostCard from "../containers/Home/PostCard";
import Header from "../containers/Home/Header";
import UserInfo from "../components/UserInfo";
import Messenger from "../containers/Home/Messenger";

import { LOAD_MAIN_POSTS_REQUEST } from "../reducer/post";
import { LOAD_CHAT_ROOM_REQUEST } from "../reducer/chat";

const Wrapper = styled.div`
  background-color: #fafafa;
  height: 100%;
`;

const Side = styled.div`
  width: 50%;
  height: 60%;
  margin-top: 40px;
  margin-left: 40px;
`;

const Home = () => {
  const { user } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    });
    dispatch({
      type: LOAD_CHAT_ROOM_REQUEST
    });
  }, []);

  return (
    <div style={{ backgroundColor: "whilte" }}>
      <Header />
      <Wrapper>
        <Row>
          <Col md={16}>
            {mainPosts &&
              mainPosts.map(v => {
                return <PostCard key={v.id} post={v} />;
              })}
          </Col>

          <Col
            md={8}
            style={{
              position: "sticky",
              top: 0
            }}
          >
            <Side>
              <UserInfo user={user} />
              <Messenger />
            </Side>
          </Col>
        </Row>
      </Wrapper>
    </div>
  );
};

export default Home;
