import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import { Input, Form, Icon, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { LOG_IN_REQUEST } from "../reducer/user";

const Wrapper = styled.div`
  height: 70vh;
  display: flex;
`;

const CustomForm = styled(Form)`
  margin: auto;
  width: 20%;
`;

const SignUp = ({ children }) => {
  const [id, setChangeId] = useState("");
  const [password, setChangePassword] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    user && Router.push("/home");
  }, user);

  const onChangeId = e => {
    setChangeId(e.target.value);
  };

  const onChangePassword = e => {
    setChangePassword(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        id,
        password
      }
    });
  };

  return (
    <Wrapper>
      {children}
      <CustomForm onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />

          <Input
            name="user-id"
            value={id}
            onChange={onChangeId}
            required
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
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
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
          />
          <br />
        </div>
        <br />
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "40%", marginRight: "20%" }}
        >
          로그인
        </Button>
        <Button type="Default" style={{ width: "40%" }}>
          <Link href="/signUp">
            <a> 회원가입</a>
          </Link>
        </Button>
      </CustomForm>
    </Wrapper>
  );
};

export default SignUp;
