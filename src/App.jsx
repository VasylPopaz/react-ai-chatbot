import Chat from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";

import { useMessages } from "./hooks/useMessages";
import { Assistant } from "./assistants/googleai";
import s from "./App.module.css";

const App = () => {
  const { messages, addMessage } = useMessages();

  const assistant = new Assistant();

  const handleContentSend = async (content) => {
    addMessage({ role: "user", content });

    try {
      const result = await assistant.chat(content);

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
        <Controls onSend={handleContentSend} />
      </div>
    </div>
  );
};

export default App;
