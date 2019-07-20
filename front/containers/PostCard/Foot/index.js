import React from "react";
import styled from "styled-components";

import { Icon } from "antd";

import Reply from "../../../components/reply";

const Wrapper = styled.div`
  height: 230px;
  width: 100%;
  border-bottom: 1px solid #edebeb;
`;

const SectionWrapper = styled.section`
  margin-top: 10px;
  margin-left: 15px;
`;

const IconCustom = styled(Icon)`
  margin-right: 40px;
`;

const LikerCustom = styled.span`
  color: black;
`;

const Foot = () => {
  return (
    <Wrapper>
      <SectionWrapper>
        <IconCustom
          type="heart"
          theme={"outlined"}
          twoToneColor="red"
          style={{ fontSize: "27px" }}
        />
        <IconCustom type="message" style={{ fontSize: "27px" }} />
      </SectionWrapper>
      <SectionWrapper>
        <LikerCustom>9명</LikerCustom>
        <span>이 좋아합니다</span>
      </SectionWrapper>
      <SectionWrapper>
        <div>antd.9615 손 떨린 흔적 ...더보기</div>
        <div>42개의 댓글보기</div>
        <Reply reply={["댓글1", "댓글2", "댓글3", "댓글4"]} />
      </SectionWrapper>
    </Wrapper>
  );
};

export default Foot;
