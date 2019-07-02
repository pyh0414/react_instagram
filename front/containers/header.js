import React, { useState, useEffect } from "react";
import { Col, Input, Form, Icon, Button } from "antd";
import styled from "styled-components";

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
            </Form.Item>
          </Form>
        )}
      </Col>
    </HeaderWrapper>
  );
};

export default Header;
