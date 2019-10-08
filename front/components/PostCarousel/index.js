import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Icon } from "antd";

const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.5;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 55%;
  height: 500px;
`;

const PostCarousel = ({ onChangePostModal }) => {
  const onCloseModal = useCallback(() => {
    onChangePostModal();
  }, []);
  return (
    <Modal>
      <ModalContent>
        <span>aqweqwe</span>
        <Icon style={{ float: "right" }} type="close" onClick={onCloseModal} />
      </ModalContent>
    </Modal>
  );
};

export default PostCarousel;
