import React, { useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  let roomSocket;
  let chatSocket;

  useEffect(() => {
    roomSocket = io("localhost:3060/room");
    chatSocket = io("localhost:3060/chat");
  }, []);
  return <div>Chat</div>;
};

export default Chat;
