import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 5px;
`;

const Contents = ({ content }) => {
  return (
    <Wrapper>
      <div>{content}</div>
    </Wrapper>
  );
};

export default Contents;
