import React from "react";
import styled from "styled-components";

import Head from "./Head";
import Images from "./Images";
import Body from "./Body";
import Comment from "./Comment";

const Wrapper = styled.div`
  margin-left: 40%;
  width: 60%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #edebeb;
`;

const Container = styled.div`
  padding-top: 40px;
`;

const Article = ({ post }) => {
  return (
    <Container>
      <Wrapper>
        <Head user={post.User} />
        <Images imagePath={post.Images[0].src} />
        <Body post={post} />
        <Comment />
      </Wrapper>
    </Container>
  );
};

export default Article;
