import React, { useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import { useSelector } from "react-redux";

import PostCard from "../containers/PostCard";
import Header from "../containers/Header";

const Wrapper = styled.div`
  background-color: #fafafa;
  height: 100%;
`;

const Home = () => {
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    !user && Router.push("/");
  }, [user]);

  return (
    <div style={{ backgroundColor: "whilte" }}>
      <Header />
      <Wrapper>
        <PostCard />
      </Wrapper>
    </div>
  );
};

export default Home;
