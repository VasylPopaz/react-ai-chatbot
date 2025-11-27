import { useEffect, useState } from "react";

import Loader from "../Loader/Loader";
import Messages from "../Messages/Messages";
import Controls from "../Controls/Controls";

import { useMessages } from "../../hooks/useMessages";

import s from "./Chat.module.css";

const Chat = ({ assistant, chatId, chatMessages }) => {
  const { messages, setMessages, addMessage, updateLastMessageContent } =
    useMessages();

  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    setMessages(chatMessages);
  }, [chatId]);

  const handleContentSend = async (content) => {
    addMessage({ role: "user", content });
    setIsLoading(true);
    try {
      const result = assistant.chatStream(
        content,
        messages.filter(({ role }) => role !== "system")
      );

      let isFirstChunk = false;
      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ role: "assistant", content: "" });
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateLastMessageContent(chunk);
      }

      setIsStreaming(false);
    } catch (error) {
      addMessage({
        role: "system",
        content:
          error?.message ??
          "Sorry, I couldn't process your request. Please try again.",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <>
      {" "}
      {isLoading && <Loader />}
      <div className={s.chat}>
        <Messages messages={messages} />
      </div>
      <Controls
        isDisabled={isLoading || isStreaming}
        onSend={handleContentSend}
      />
    </>
  );
};

export default Chat;
