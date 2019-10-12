import React, { useCallback } from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { useSelector } from "react-redux";

import ImageCarousel from "./ImageCarousel";
import UserInfo from "./UserInfo";
import Content from "./PostContent";
import Comment from "./PostComment";

const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: black;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid black;
  width: 55%;
  height: 420px;
  display: flex;
`;

const PostCarousel = ({ onCloseModal, user, post }) => {
  const { selectedPost } = useSelector(state => state.post);
  return (
    <Modal>
      <ModalContent>
        <div style={{ width: "65%", height: "100%" }}>
          <ImageCarousel images={selectedPost.Images} />
        </div>
        <div style={{ width: "35%", height: "100%" }}>
          <Icon
            style={{ float: "right", margin: "8px 10px 0px 0px" }}
            type="close"
            onClick={() => {
              return onCloseModal();
            }}
          />
          <div
            style={{
              borderBottom: " 1px solid rgba(0, 0, 0, 0.0975)",
              paddingTop: "14px",
              paddingBottom: "14px"
            }}
          >
            <UserInfo user={user} />
          </div>

          <div
            style={{
              paddingLeft: "20px"
            }}
          >
            <Content contents={selectedPost.content} />
            <div style={{ overflow: "scroll", height: "300px" }}>
              <Comment comments={selectedPost.Comments} />
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default PostCarousel;
