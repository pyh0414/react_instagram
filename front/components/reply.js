import React from "react";

const Reply = ({ reply }) => {
  const items = reply.map((v, i) => {
    return <li key={i}>{v}</li>;
  });
  return items;
};

export default Reply;
