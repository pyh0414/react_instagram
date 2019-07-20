import React from "react";
import styled from "styled-components";
import Router from "next/router";

import Head from "./Head";
import Body from "./Body";
import Foot from "./Foot";
import Comment from "./Comment";

const Wrapper = styled.div`
  width: 43%;
  height: 1000%;
  background-color: #fff;
  border: 1px solid #edebeb;
  margin: auto;
`;

const Container = styled.div`
  padding-top: 40px;
`;

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Article = () => {
  return list.map(v => {
    return (
      <Container>
        <Wrapper>
          <Head />
          <Body />
          <Foot />
          <Comment />
        </Wrapper>
      </Container>
    );
  });
};

export default Article;
