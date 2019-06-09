import React from "react";
import { Col, Row } from "antd";
import styled from "styled-components";

import Header from "../containers/header";

const AppLayoutWrapper = styled.div`
  background-color: #fafafa;
  height: 100vh;
  width: 100vw;
`;
const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <AppLayoutWrapper>
        <Row>
          <Col xs={2} md={6}>
            6
          </Col>
          <Col xs={4} md={12}>
            12
          </Col>
          <Col xs={2} md={6}>
            6
          </Col>
        </Row>
      </AppLayoutWrapper>
    </>
  );
};

export default AppLayout;
