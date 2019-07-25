import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  float: left;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ImgCustom = styled.img`
  width: 6%;
  height: 72%;
  border-radius: 100%;
  margin-left: 15px;
`;

const UserCustom = styled.div`
  font-weight: bold;
  color: #202020;
  font-size: 14px;
  margin-left: 10px;
`;

const Head = ({ user }) => {
  const { userId, profile } = user;
  return (
    <Wrapper>
      <ImgCustom src={`http://localhost:3060/${profile}`} />
      <UserCustom>{userId}</UserCustom>
    </Wrapper>
  );
};

export default Head;
