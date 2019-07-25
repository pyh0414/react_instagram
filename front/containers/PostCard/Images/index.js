import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 500px;
  width: 100%;
`;

const ImgCustom = styled.img`
  width: 100%;
  height: 440px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = ({ imagePath }) => {
  return (
    <Wrapper>
      <ImgCustom src={`http://localhost:3060/${imagePath}`} />
    </Wrapper>
  );
};

export default Body;
