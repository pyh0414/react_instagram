import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2px;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 100%;
  margin-left: 15px;
`;

const User = styled.div`
  margin-left: 12px;
`;

const UserInfo = ({ user }) => {
  return (
    <Wrapper>
      {user && <UserProfile src={`http://localhost:3060/${user.profile}`} />}
      <User>
        {user && <div style={{ fontWeight: "bold" }}>{user.userId}</div>}
        {user && <div style={{ color: "#A4A4A4" }}>{user.name}</div>}
      </User>
    </Wrapper>
  );
};

export default UserInfo;
