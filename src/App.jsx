import { useState } from "react";

import Chat from "./components/Chat/Chat";
import Loader from "./components/Loader/Loader";
import Controls from "./components/Controls/Controls";

import { useMessages } from "./hooks/useMessages";
import { Assistant } from "./assistants/openai";
import s from "./App.module.css";

const App = () => {
  const { messages, addMessage, updateLastMessageContent } = useMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const assistant = new Assistant();

  const handleContentSend = async (content) => {
    addMessage({ role: "user", content });
    setIsLoading(true);
    try {
      const result = assistant.chatStream(content, messages);

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
    } catch (e) {
      console.log(e);
      addMessage({
        role: "system",
        content: "Sorry, I couldn't process your request. Please try again.",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className={s.app}>
      <header className={s.header}>
        <img className={s.logo} src="/chat-bot.png" alt="Logo" />
        <h2 className={s.title}>AI Chatbot</h2>
      </header>
      <div className={s.chatContainer}>
        <Chat messages={messages} />
        <Controls
          isDisabled={isLoading || isStreaming}
          onSend={handleContentSend}
        />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
