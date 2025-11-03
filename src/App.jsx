import { useState } from "react";

import Chat from "./components/Chat/Chat";
import Theme from "./components/Theme/Theme";
import Loader from "./components/Loader/Loader";
import Controls from "./components/Controls/Controls";
import Assistant from "./components/Assistant/Assistant";

import { useMessages } from "./hooks/useMessages";

import s from "./App.module.css";

let assistant;

const App = () => {
  const { messages, addMessage, updateLastMessageContent } = useMessages();

  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

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

  const handleAssistantChange = (newAssistant) => {
    assistant = newAssistant;
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
        <div className={s.settings}>
          <Assistant onAssistantChange={handleAssistantChange} />
          <Theme />
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
