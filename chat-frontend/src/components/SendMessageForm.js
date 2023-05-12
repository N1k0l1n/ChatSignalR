import React, { useState } from "react";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          placeholder="message..."
          onChange={handleMessage}
          value={message}
        />
        <InputGroup>
          <Button variant="primary" type="submit" disabled={!message}>
            Send
          </Button>
        </InputGroup>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
