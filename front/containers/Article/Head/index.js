import React from "react";
import styled from "styled-components";
import { Card, Avatar } from "antd";

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

const Head = () => {
  const { Meta } = Card;
  return (
    <Wrapper>
      <ImgCustom src="https://scontent-gmp1-1.cdninstagram.com/vp/aefaa2b2eaf64a0c44c988ca5b40c246/5DB9C9A5/t51.2885-19/s150x150/43985676_1132182186948327_7359602482340691968_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com" />
      <UserCustom>antd.9615</UserCustom>
    </Wrapper>
  );
};

export default Head;
