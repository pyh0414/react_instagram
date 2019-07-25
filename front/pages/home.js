import React, { useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Col, Row } from "antd";

import PostCard from "../containers/PostCard";
import Header from "../containers/Header";
import UserInfo from "../containers/HomeUserInfo";
import Chat from "../containers/Chat";

import { LOAD_MAIN_POSTS_REQUEST } from "../reducer/post";

const Wrapper = styled.div`
  background-color: #fafafa;
  height: 100%;
`;

const Side = styled.div`
  position: sticky;
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
    !user && Router.push("/");
  }, [user]);

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
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

          <Col md={8}>
            <Side>
              <UserInfo />
              <Chat />
            </Side>
          </Col>
        </Row>
      </Wrapper>
    </div>
  );
};

export default Home;
