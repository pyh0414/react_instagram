import React from "react";
import styled from "styled-components";

import Reply from "../../../components/reply";

const Wrapper = styled.div`
  margin-top: 5px;
`;

const Comments = () => {
  return (
    <Wrapper>
      <div>42개의 댓글보기</div>
      <Reply reply={["댓글1", "댓글2", "댓글3", "댓글4"]} />
    </Wrapper>
  );
};

export default Comments;
