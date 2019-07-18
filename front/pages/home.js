import React from "react";
import styled from "styled-components";

import PostCard from "../containers/PostCard";
import Header from "../containers/Header";

const Wrapper = styled.div`
  background-color: #fafafa;
  height: 100%;
`;

const Home = () => {
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
