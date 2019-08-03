import React, { useCallback, useState, useRef, useEffect } from "react";
import { Modal, Form, Input, Button, Icon, Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { roomSocket } from "../../../../utils/socket";
import { MAKE_ROOM_REQUEST } from "../../../../reducer/chat";

const makeRoomModal = ({ setmodalVisibleProps }) => {
  const [modalVisible, setmodalVisible] = useState(true);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const formSubmit = useRef();

  const onHandleOk = useCallback(() => {
    setmodalVisible(false);
    setmodalVisibleProps(false);
  });

  useEffect(() => {
    roomSocket.on("test", () => {
      console.log("@@");
    });
  }, []);

  const onHandleCancel = useCallback(() => {
    setmodalVisible(false);
    setmodalVisibleProps(false);
  }, []);

  const onClickSubmit = useCallback(() => {
    if (text.trim() == "") {
      return message.error("채팅방 이름을 적어주세요 !");
    }
    formSubmit.current.props.onSubmit();
  }, [text]);

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: MAKE_ROOM_REQUEST,
      data: text
    });
  });

  const onChangeText = useCallback(
    e => {
      setText(e.target.value);
    },
    [text]
  );

  return (
    <Modal
      width={350}
      title="방 만들기"
      visible={modalVisible}
      onOk={onHandleOk}
      onCancel={onHandleCancel}
      bodyStyle={{ height: 75 }}
      footer={[
        <Button type="primary" onClick={onClickSubmit}>
          확인
        </Button>
      ]}
    >
      <Form ref={formSubmit} onSubmit={onSubmitForm}>
        <Input
          placeholder="방 제목을 입력해주세요"
          value={text}
          onChange={onChangeText}
        />
      </Form>
    </Modal>
  );
};

export default makeRoomModal;
