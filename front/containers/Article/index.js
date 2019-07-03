import React from "react";
import styled from "styled-components";

import Head from "./Head";
import Body from "./Body";
import Foot from "./Foot";
import Comment from "./Comment";

const Wrapper = styled.div`
  width: 43%;
  height: 1000%;
  background-color: #fff;
  margin-top: 3%;
  border: 1px solid #edebeb;
`;

const Article = () => {
  return (
    <Wrapper>
      <Head />
      <Body />
      <Foot />
      <Comment />
    </Wrapper>
  );
};

export default Article;
