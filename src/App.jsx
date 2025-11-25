import { useState } from "react";

import Chat from "./components/Chat/Chat";
import Theme from "./components/Theme/Theme";
import Sidebar from "./components/Sidebar/Sidebar";
import Assistant from "./components/Assistant/Assistant";

import s from "./App.module.css";

const App = () => {
  const [assistant, setAssistant] = useState();
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
        <Sidebar />
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
