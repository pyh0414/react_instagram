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

const Body = () => {
  return (
    <Wrapper>
      <ImgCustom src="https://t1.daumcdn.net/cfile/tistory/2122BD4F5966F29B13" />
    </Wrapper>
  );
};

export default Body;
