import React from "react";
import styled from "styled-components";

import LikeAndComment from "./LikeAndComment";
import Liker from "./Liker";
import Contents from "./Contents";
import Comments from "./Comments";

const Wrapper = styled.div`
  height: 230px;
  width: 100%;
  border-bottom: 1px solid #edebeb;
  margin-top: 10px;
  margin-left: 15px;
`;

const Body = ({ post }) => {
  return (
    <Wrapper>
      <LikeAndComment postId={post.id} likers={post.Likers} />
      <Liker likers={post.Likers} />
      <Contents />
      <Comments />
    </Wrapper>
  );
};

export default Body;
