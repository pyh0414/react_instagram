import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Input, Form, Icon, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  SIGN_UP_REQUEST,
  ID_CHECK_REQUEST,
  UPLOAD_PROFILE_REQUEST
} from "../reducer/user";

const Wrapper = styled.div`
  height: 70vh;
  display: flex;
`;

const FormCustom = styled(Form)`
  display: block;
  margin: auto;
  width: 25%;
`;

const IdCheckButtonCustom = styled(Button)`
  margin-top: 5px;
`;

const ImageCustom = styled.img`
  width: 400px;
  height: 400px;
`;

const SignUp = () => {
  const [id, setChangeId] = useState("");
  const [name, setChangeName] = useState("");
  const [password, setChangePassword] = useState("");
  const [passwordCheck, setChangePasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const { idCheck, profileImage } = useSelector(state => state.user);
  const imageInput = useRef();

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

  const onSubmitForm = useCallback(
    e => {
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
    },
    [id, password, name]
  );

  const onCheckId = useCallback(() => {
    dispatch({
      type: ID_CHECK_REQUEST,
      data: {
        id
      }
    });
  }, [id]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    const imgFormData = new FormData();
    imgFormData.append("image", e.target.files[0]);

    dispatch({
      type: UPLOAD_PROFILE_REQUEST,
      data: imgFormData
    });
  }, []);

  return (
    <Wrapper>
      <FormCustom encType="multipart/form-data" onSubmit={onSubmitForm}>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input
          name="user-id"
          value={id}
          onChange={onChangeId}
          required
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        />

        <IdCheckButtonCustom type="danger" onClick={onCheckId}>
          중복확인
        </IdCheckButtonCustom>
        {idCheck && "중복된 아이디 입니다"}

        <br />

        <div>
          <label htmlFor="user-id">이름</label>
          <br />
          <Input
            name="user-id"
            value={name}
            onChange={onChangeName}
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
        <div>
          <label htmlFor="user-password">비밀번호확인</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
          />
        </div>

        {passwordError && (
          <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
        )}
        <div>
          <label htmlFor="user-profile">프로필 사진</label>
          <input
            type="file"
            ref={imageInput}
            multiple
            hidden
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <br />
          {profileImage && (
            <ImageCustom src={`http://localhost:3060/${profileImage}`} />
          )}
        </div>
        <br />

        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "40%", marginRight: "20%" }}
        >
          가입
        </Button>

        <Button type="Default" style={{ width: "40%" }}>
          <Link href="/">
            <a> 뒤로가기</a>
          </Link>
        </Button>
      </FormCustom>
    </Wrapper>
  );
};

export default SignUp;
