import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 13px;
  img {
    border-radius: 30%;
    width: 37px;
    height: 37px;
  }
  span {
    margin-left: 5px;
    color: black;
  }
`;

const ShowLikerItem = ({ item }) => {
  return (
    <Wrapper>
      <img src={`http://localhost:3060/${item.profile}`} />
      <span>{item.userId}</span>
    </Wrapper>
  );
};

export default ShowLikerItem;
