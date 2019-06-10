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
  const dummy = {
    me: { id: "pyh" },
    isLoggedIn: false
  };
  return (
    <div>
      <>
        <Header />
        <AppLayoutWrapper>
          <Row>
            <Col xs={2} md={6}>
              6
            </Col>
            <Col xs={4} md={12}>
              <children />
            </Col>
            <Col xs={2} md={6}>
              6
            </Col>
          </Row>
        </AppLayoutWrapper>
      </>
    </div>
  );
};

export default AppLayout;
