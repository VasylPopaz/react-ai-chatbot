import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Chat from "./components/Chat/Chat";
import Theme from "./components/Theme/Theme";
import Sidebar from "./components/Sidebar/Sidebar";
import Assistant from "./components/Assistant/Assistant";

import s from "./App.module.css";

const App = () => {
  const [assistant, setAssistant] = useState();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const activeChatMessages = useMemo(
    () => chats.find(({ id }) => id === activeChatId)?.messages ?? [],
    [chats, activeChatId]
  );

  useEffect(() => {
    handleNewChatCreate();
  }, []);

  const handleAssistantChange = useCallback((newAssistant) => {
    setAssistant(newAssistant);
  }, []);

  const handleChatMessagesUpdate = (id, messages = []) => {
    const title = messages[0]?.content.split(" ").slice(0, 7).join(" ");
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              title: chat.title ?? title,
              messages,
            }
          : chat
      )
    );
  };
  const handleNewChatCreate = () => {
    const id = uuidv4();

    setActiveChatId(id);
    setChats((prev) => [...prev, { id, messages: [] }]);
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
          {chats.map((chat) => (
            <Chat
              key={chat.id}
              assistant={assistant}
              chatId={chat.id}
              chatMessages={chat.messages}
              onChatMessagesUpdate={handleChatMessagesUpdate}
              isActive={chat.id === activeChatId}
            />
          ))}

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
