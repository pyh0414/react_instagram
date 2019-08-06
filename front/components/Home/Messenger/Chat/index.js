import React from "react";

const ChatItem = ({ item }) => {
  return (
    <div>
      <span> {item.content}</span>
      <span> {item.userId}</span>
    </div>
  );
};

export default ChatItem;
