import { useCallback, useEffect, useState } from "react";

import s from "./Sidebar.module.css";

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
const Sidebar = ({ chats = CHATS, activeChatId = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEscapePress = (event) => {
    if (isOpen && event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (isOpen && e.code === "Escape") {
        toggleSidebar();
      }
    };

    if (toggleSidebar) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <>
      <button
        type="button"
        className={s.menuButton}
        onClick={toggleSidebar}
        onKeyDown={handleEscapePress}
      >
        <MenuIcon />
      </button>
      <div className={s.sidebar} data-open={isOpen}>
        <ul className={s.chats}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={s.chat}
              data-active={chat.id === activeChatId}
            >
              <button type="button" className={s.chatButton}>
                <div className={s.chatTitle}> {chat.title}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && <div className={s.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

const MenuIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#1f1f1f"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
};
