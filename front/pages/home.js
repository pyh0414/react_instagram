import React from "react";
import styled from "styled-components";

import Article from "../containers/Article";
import Header from "../containers/Header";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  height: 100%;
`;

const Home = () => {
  return (
    <div style={{ backgroundColor: "whilte" }}>
      <Header />
      <Wrapper>
        <Article />
      </Wrapper>
    </div>
  );
};

export default Home;
