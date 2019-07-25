import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 5px;
`;

const Liker = ({ likers }) => {
  return (
    <Wrapper>
      <span style={{ color: "black" }}>{likers.length}명</span>
      <span>이 좋아합니다</span>
    </Wrapper>
  );
};

export default Liker;
