import { useState } from "react";

import Chat from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";

import s from "./App.module.css";

function App() {
  const [messages, setMessages] = useState([]);

  const handleContentSend = (content) => {
    setMessages((prevMessages) => [...prevMessages, { role: "user", content }]);
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
}

export default App;
