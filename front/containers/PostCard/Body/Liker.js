import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 5px;
`;

const Liker = () => {
  return (
    <Wrapper>
      <span style={{ color: "black" }}>9명</span>
      <span>이 좋아합니다</span>
    </Wrapper>
  );
};

export default Liker;
