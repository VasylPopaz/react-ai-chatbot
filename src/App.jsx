import { useState } from "react";

import Chat from "./components/Chat/Chat";
import Theme from "./components/Theme/Theme";
import Sidebar from "./components/Sidebar/Sidebar";
import Assistant from "./components/Assistant/Assistant";

import s from "./App.module.css";

const CHATS = [
  {
    id: 1,
    title: "How to use AI Tools API in React Application",
  },
  {
    id: 2,
    title: "Gemini AI vs ChatGPT",
  },
  {
    id: 3,
    title: "Comparising Models for Popular AI Tools",
  },
  {
    id: 4,
    title: "How to use AI tools in your daily life",
  },
  {
    id: 5,
    title: "How to use AI tools in your daily work",
  },
];

const App = () => {
  const [assistant, setAssistant] = useState();
  const [chats, setChats] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState(1);

  const handleAssistantChange = (newAssistant) => {
    setAssistant(newAssistant);
  };

  return (
    <div className={s.app}>
      <header className={s.header}>
        <img className={s.logo} src="/chat-bot.png" alt="Logo" />
        <h2 className={s.title}>AI Chatbot</h2>
      </header>
      <div className={s.content}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onActiveChatIdChange={setActiveChatId}
        />
        <main className={s.main}>
          <Chat assistant={assistant} />
          <div className={s.settings}>
            <Assistant onAssistantChange={handleAssistantChange} />
            <Theme />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
