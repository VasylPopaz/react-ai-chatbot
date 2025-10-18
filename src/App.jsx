import { useState } from "react";

import Chat from "./components/Chat/Chat";
import Loader from "./components/Loader/Loader";
import Controls from "./components/Controls/Controls";

import { useMessages } from "./hooks/useMessages";
import { Assistant } from "./assistants/openai";
import s from "./App.module.css";

const App = () => {
  const { messages, addMessage } = useMessages();
  const [isLoading, setIsLoading] = useState(false);

  const assistant = new Assistant();

  const handleContentSend = async (content) => {
    addMessage({ role: "user", content });
    setIsLoading(true);
    try {
      const result = await assistant.chat(content, messages);

      addMessage({
        role: "assistant",
        content: result,
      });
    } catch (e) {
      console.log(e);
      addMessage({
        role: "system",
        content: "Sorry, I couldn't process your request. Please try again.",
      });
    } finally {
      setIsLoading(false);
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
        <Controls isDisabled={isLoading} onSend={handleContentSend} />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
