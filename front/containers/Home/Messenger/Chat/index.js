import React from "react";
import { useSelector } from "react-redux";

import ChatItem from "../../../../components/Home/Messenger/Chat";
import Foot from "./foot";

const Index = () => {
  const { currentRoom } = useSelector(state => state.chat);
  return (
    <>
      <div style={{ height: "93%" }}>
        {currentRoom.chats.length > 0 &&
          currentRoom.chats.map((v, i) => {
            return <ChatItem item={v} key={v.id} />;
          })}
      </div>
      <Foot />
    </>
  );
};

export default Index;
