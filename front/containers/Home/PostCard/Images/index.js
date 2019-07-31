import React, { useCallback } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 500px;
  width: 100%;
`;

const ImgCustom = styled.img`
  width: 100%;
  height: 440px;
`;

const Image = ({ images }) => {
  return (
    <Wrapper>
      <ImgCustom src={`http://localhost:3060/${images[0].src}`} />
    </Wrapper>
  );
};

export default Image;
