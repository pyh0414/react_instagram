import React from "react";
import styled from "styled-components";

import { Icon } from "antd";

const Wrapper = styled.div`
  height: 230px;
  width: 100%;
  border-bottom: 1px solid #edebeb;
`;

const IconWrapper = styled.section`
  margin-top: 10px;
  margin-left: 10px;
`;

const IconCustom = styled(Icon)`
  min-width: 60px;
`;

const Foot = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <IconCustom
          type="heart"
          theme={"twoTone"}
          twoToneColor="red"
          style={{ fontSize: "27px" }}
        />
        <IconCustom type="message" style={{ fontSize: "27px" }} />
      </IconWrapper>
    </Wrapper>
  );
};

export default Foot;
