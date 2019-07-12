import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import { Input, Form, Icon, Button, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  SIGN_UP_REQUEST,
  EXISTING_ID_CHECK_REQUEST,
  UPLOAD_PROFILE_REQUEST
} from "../reducer/user";

const Wrapper = styled.div`
  height: 70vh;
  display: flex;
`;

const FormCustom = styled(Form)`
  display: block;
  margin: auto;
  width: 22%;
`;

const Foot = styled.div`
  text-align: center;
  margin-top: 20px;
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
  const {
    isExistingId,
    profileImage,
    isSignedUpSuccess,
    hasIdChecked
  } = useSelector(state => state.user);

  useEffect(() => {
    if (isSignedUpSuccess) {
      alert("로그인 페이지로 이동합니다.");
      Router.push("/");
    }
  }, [isSignedUpSuccess]);

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
          name,
          profileImage
        }
      });
    },
    [id, password, name, profileImage]
  );

  const onExistingIdCheck = useCallback(() => {
    dispatch({
      type: EXISTING_ID_CHECK_REQUEST,
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

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <Wrapper>
      <FormCustom encType="multipart/form-data" onSubmit={onSubmitForm}>
        <br />
        <Input
          name="user-id"
          placeholder="이메일"
          value={id}
          onChange={onChangeId}
          required
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
        <IdCheckButtonCustom type="danger" onClick={onExistingIdCheck}>
          중복확인
        </IdCheckButtonCustom>
        {hasIdChecked &&
          (isExistingId ? "중복된 아이디 입니다" : "사용가능한 아이디 입니다.")}
        <br />
        <div>
          <br />
          <Input
            name="user-id"
            placeholder="이름"
            value={name}
            onChange={onChangeName}
            required
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </div>
        <div>
          <br />

          <Input
            name="user-password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
            required
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
          />
          <br />
          <br />
        </div>
        <div>
          <Input
            name="user-password-check"
            placeholder="비밀번호확인"
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
          <input
            type="file"
            ref={imageInput}
            multiple
            hidden
            onChange={onChangeImages}
          />
          {/* <Button onClick={onClickImageUpload}>이미지 업로드</Button> */}
          <br />
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 프로필 업로드
            </Button>
          </Upload>

          <br />
          {profileImage && (
            <ImageCustom src={`http://localhost:3060/${profileImage}`} />
          )}
        </div>
        <br />
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          가입하기
        </Button>
        <Foot>
          이미 가입하셨다면 ?
          <Link href="/">
            <a> 로그인</a>
          </Link>
        </Foot>
      </FormCustom>
    </Wrapper>
  );
};

export default SignUp;
