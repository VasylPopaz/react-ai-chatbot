import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Chat from "./components/Chat/Chat";
import Theme from "./components/Theme/Theme";
import Sidebar from "./components/Sidebar/Sidebar";
import Assistant from "./components/Assistant/Assistant";

import s from "./App.module.css";

const CHATS = [
  {
    id: 1,
    title: "Gemini AI vs ChatGPT",
    messages: [
      { role: "user", content: "What is better ChatGPT or Gemini?" },
      {
        role: "assistant",
        content: "Hi! Can you explain for what type of tasks you will use it?",
      },
    ],
  },
  {
    id: 2,
    title: "How to use AI tools in your daily life",
    messages: [
      { role: "user", content: "Hey! How to use AI in my life?" },
      {
        role: "assistant",
        content: "Hi! Would you like to use it for work or for hobbies?",
      },
    ],
  },
];

const App = () => {
  const [assistant, setAssistant] = useState();
  const [chats, setChats] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState(1);
  const activeChatMessages = useMemo(
    () => chats.find(({ id }) => id === activeChatId)?.messages ?? [],
    [chats, activeChatId]
  );

  const handleAssistantChange = (newAssistant) => {
    setAssistant(newAssistant);
  };

  const handleChatMessagesUpdate = (messages = []) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages } : chat
      )
    );
  };
  const handleNewChatCreate = () => {
    const id = uuidv4();

    setActiveChatId(id);
    setChats((prev) => [...prev, { id, title: "New chat", messages: [] }]);
  };

  const handleActiveChatIdChange = (id) => {
    setActiveChatId(id);
    setChats((prev) => prev.filter(({ messages }) => messages.length > 0));
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
          activeChatMessages={activeChatMessages}
          onActiveChatIdChange={handleActiveChatIdChange}
          onNewChatCreate={handleNewChatCreate}
        />
        <main className={s.main}>
          <Chat
            assistant={assistant}
            chatId={activeChatId}
            chatMessages={activeChatMessages}
            onChatMessagesUpdate={handleChatMessagesUpdate}
          />
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
