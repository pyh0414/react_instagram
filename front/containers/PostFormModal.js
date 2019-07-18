import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, Button, Icon, Popconfirm, message } from "antd";

import {
  UPLOAD_POST_IMAGE_REQUEST,
  CLEAR_POST_IMAGEPATH_REQUEST,
  DELETE_POST_IMAGE_REQUEST
} from "../reducer/post";

const PostForm = ({ setmodalVisibleProps }) => {
  const [modalVisible, setmodalVisible] = useState(true);
  const [text, setText] = useState("");

  const imageInput = useRef();
  const dispatch = useDispatch();

  const { imagePaths } = useSelector(state => state.post);

  useEffect(() => {
    return () => {
      setmodalVisible(true);
      setmodalVisibleProps(false);
      dispatch({
        type: CLEAR_POST_IMAGEPATH_REQUEST
      });
    };
  }, [modalVisible]);

  const onHandleOk = useCallback(() => {
    setmodalVisible(false);
  }, modalVisible);

  const onHandleCancel = useCallback(() => {
    setmodalVisible(false);
  }, modalVisible);

  const onChangeText = useCallback(
    e => {
      setText(e.target.value);
    },
    [text]
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    const imgFormData = new FormData();
    Object.keys(e.target.files).map(c => {
      imgFormData.append("image", e.target.files[c]);
    });

    dispatch({
      type: UPLOAD_POST_IMAGE_REQUEST,
      data: imgFormData
    });
  }, []);

  const onDeleteImage = useCallback(
    index => () => {
      dispatch({
        type: DELETE_POST_IMAGE_REQUEST,
        data: index
      });
    },
    []
  );

  return (
    <>
      <Modal
        title="게시글 작성"
        centered
        visible={modalVisible}
        onOk={onHandleOk}
        onCancel={onHandleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={onHandleOk}>
            공유하기
          </Button>
        ]}
      >
        <Form>
          <Input.TextArea
            maxLength={140}
            placeholder="어떤 재미난 일이 있었나요 ? "
            value={text}
            onChange={onChangeText}
          />
          <input
            type="file"
            ref={imageInput}
            multiple
            hidden
            onChange={onChangeImages}
          />
          {imagePaths.map((v, i) => {
            return (
              <Popconfirm
                title="삭제 하시겠습니까 ?"
                okText="삭제"
                cancelText="취소"
                onConfirm={onDeleteImage}
                icon={<Icon type="delete" />}
              >
                <div key={i} style={{ display: "inline-block" }}>
                  <img
                    src={`http://localhost:3060/${v}`}
                    style={{ width: "200px" }}
                    alt={v}
                  />
                </div>
              </Popconfirm>
            );
          })}
          <div>
            <Button onClick={onClickImageUpload}>
              <Icon type="upload" />
              사진 업로드
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default PostForm;
