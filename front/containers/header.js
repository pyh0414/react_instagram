import React from "react";
import { Col, Row, Input } from "antd";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 70px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  margin: 0px auto;
`;

const Search = styled.div`
  width: 50%;
  display: block;
  margin: 0px auto;
`;

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Col xs={5} md={6}>
          <Image src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" />
        </Col>
        <Col xs={10} md={12}>
          <Search>
            <Input.Search size="small" />
          </Search>
        </Col>
        <Col xs={5} md={6}>
          <Col xs={10} md={5}>
            <Image src="https://img.icons8.com/ios/50/000000/gender-neutral-user.png" />
          </Col>
          <Col xs={10} md={5}>
            <Image src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Heart-512.png" />
          </Col>
        </Col>
      </HeaderWrapper>
    </>
  );
};

export default Header;
