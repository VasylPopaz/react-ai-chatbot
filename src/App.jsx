import { useState } from "react";

import Chat from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";

import { MESSAGES } from "./constants/messages";
import s from "./App.module.css";

function App() {
  // eslint-disable-next-line
  const [messages, setMessages] = useState(MESSAGES);
  return (
    <div className={s.app}>
      <header className={s.header}>
        <img className={s.logo} src="/chat-bot.png" alt="Logo" />
        <h2 className={s.title}>AI Chatbot</h2>
      </header>
      <div className={s.chatContainer}>
        <Chat messages={messages} />
        <Controls />
      </div>
    </div>
  );
}

export default App;
