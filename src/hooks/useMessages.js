import { useState } from "react";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return { messages, addMessage };
};
