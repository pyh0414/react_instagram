import React, { useState, useCallback } from "react";
import { Form, Input, Button, InputNumber } from "antd";

const PostForm = () => {
  const [text, setText] = useState("");

  const onSubmitForm = useCallback(() => {}, [text]);
  const onChangeText = useCallback(e => {}, [text]);
  return (
    <Form onSubmit={onSubmitForm} style={{ marginTop: "20px" }}>
      <Input.TextArea
        onChange={onChangeText}
        value={text}
        maxLength={200}
        placeholder="어떤 재미난 일을 공유하고 싶으신가요 ?"
      />
    </Form>
  );
};

export default PostForm;
