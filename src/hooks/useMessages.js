import { useState } from "react";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };
  const updateLastMessageContent = (content) => {
    setMessages((prev) =>
      prev.map((message, index) =>
        index === prev.length - 1
          ? { ...message, content: `${message.content} ${content}` }
          : message
      )
    );
  };

  return { messages, setMessages, addMessage, updateLastMessageContent };
};
