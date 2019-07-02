import React, { useState } from "react";
import { Col, Input, Form, Icon, Button } from "antd";
import Modal from "react-modal";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { SIGN_UP_REQUEST } from "../reducer/user";

const HeaderWrapper = styled.div`
  height: 70px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const Image = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  margin: 0px auto;
`;

const Search = styled.div`
  width: 70%;
  display: block;
  margin: 0px auto;
`;

const Header = () => {
  const dummy = {
    user: { id: "pyh" }
  };

  const [modalStatus, setModalStatus] = useState(false);
  const [id, setChangeId] = useState("");
  const [name, setChangeName] = useState("");
  const [password, setChangePassword] = useState("");
  const [passwordCheck, setChangePasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();

  const onChangeId = e => {
    setChangeId(e.target.value);
  };

  const onChangeName = e => {
    setChangeName(e.target.value);
  };

  const onChangePassword = e => {
    setChangePassword(e.target.value);
  };
  const onChangePasswordCheck = e => {
    setPasswordError(e.target.value !== password);
    setChangePasswordCheck(e.target.value);
  };

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        id,
        password,
        name
      }
    });
  };

  return (
    <HeaderWrapper>
      <Col xs={5} md={6}>
        <Image src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" />
      </Col>
      <Col xs={10} md={9}>
        <Search>
          <Input.Search size="small" />
        </Search>
      </Col>
      <Col xs={5} md={9}>
        {!dummy.user ? (
          <>
            <Col xs={10} md={5}>
              <Image src="https://img.icons8.com/ios/50/000000/gender-neutral-user.png" />
            </Col>
            <Col xs={10} md={5}>
              <Image src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Heart-512.png" />
            </Col>
          </>
        ) : (
          <Form layout="inline">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                로그인
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={openModal}>
                회원가입
              </Button>
              {modalStatus && (
                <Modal
                  isOpen={modalStatus}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <Form onSubmit={onSubmitForm}>
                    <div>
                      <label htmlFor="user-id">아이디</label>
                      <br />

                      <Input
                        name="user-id"
                        value={id}
                        onChange={onChangeId}
                        required
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                      />
                      <br />
                      <br />
                    </div>
                    <div>
                      <label htmlFor="user-id">이름</label>
                      <br />

                      <Input
                        name="user-id"
                        value={name}
                        onChange={onChangeName}
                        required
                      />
                      <br />
                      <br />
                    </div>
                    <div>
                      <label htmlFor="user-password">비밀번호</label>
                      <br />

                      <Input
                        name="user-password"
                        value={password}
                        onChange={onChangePassword}
                        required
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                      />
                      <br />
                      <br />
                    </div>
                    <div>
                      <label htmlFor="user-password">비밀번호확인</label>
                      <br />
                      <Input
                        name="user-password-check"
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                        required
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                      />
                    </div>
                    <br />
                    {passwordError && (
                      <div style={{ color: "red" }}>
                        비밀번호가 일치하지 않습니다.
                      </div>
                    )}

                    <Button type="primary" htmlType="submit">
                      가입
                    </Button>

                    <Button type="primary" onClick={closeModal}>
                      닫기
                    </Button>
                  </Form>
                </Modal>
              )}
            </Form.Item>
          </Form>
        )}
      </Col>
    </HeaderWrapper>
  );
};

export default Header;
