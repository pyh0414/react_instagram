import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Icon } from "antd";

import ImageCarousel from "../../components/ImageCarousel";

const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: black;
  opacity: 0.9;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 55%;
  height: 420px;
  display: flex;
`;

const PostCarousel = ({ onChangePostModal, post }) => {
  const onCloseModal = useCallback(() => {
    onChangePostModal();
  }, []);
  return (
    <Modal>
      <ModalContent>
        <div style={{ width: "65%" }}>
          <ImageCarousel images={post.Images} />
        </div>
        <div style={{ width: "65%" }}>
          이미지 댓글
          <Icon
            style={{ float: "right" }}
            type="close"
            onClick={onCloseModal}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default PostCarousel;
