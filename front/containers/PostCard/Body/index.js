import React from "react";
import styled from "styled-components";

import LikeAndComment from "./Like";
import Liker from "./Liker";
import Content from "./Content";
import Comment from "./Comment";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 20px;
`;

const Body = ({ post }) => {
  return (
    <Wrapper>
      <LikeAndComment postId={post.id} likers={post.Likers} />
      <Liker likers={post.Likers} />
      <Content contents={post.content} />
      {post.Comments && post.Comments.length > 4 ? (
        <div
          style={{ marginTop: "13px", overflow: "scroll", maxHeight: "150px" }}
        >
          <Comment comments={post.Comments} />
        </div>
      ) : (
        <div style={{ marginTop: "13px" }}>
          <Comment comments={post.Comments} />
        </div>
      )}
    </Wrapper>
  );
};

export default Body;
