import react from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const UserProfile = styled.img`
  width: 47px;
  height: 50px;
  border-radius: 100%;
  margin-left: 15px;
`;
const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2px;
  align-items: center;
`;

const User = styled.div`
  margin-left: 12px;
`;

const UserInfo = () => {
  const { user } = useSelector(state => state.user);
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
