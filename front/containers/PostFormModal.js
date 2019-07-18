import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Modal, Form } from "antd";

const PostForm = ({ setmodalVisibleProps }) => {
  const [modalVisible, setmodalVisible] = useState(true);

  const onHandleOk = useCallback(() => {
    setmodalVisible(false);
  }, modalVisible);

  const onHandleCancel = useCallback(() => {
    setmodalVisible(false);
  }, modalVisible);

  useEffect(() => {
    return () => {
      setmodalVisible(true);
      setmodalVisibleProps(false);
    };
  }, [modalVisible]);

  return (
    <>
      <Modal
        visible={modalVisible}
        onOk={onHandleOk}
        onCancel={onHandleCancel}
      />
    </>
  );
};

export default PostForm;
