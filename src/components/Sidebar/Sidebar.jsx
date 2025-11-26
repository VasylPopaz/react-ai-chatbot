import { useCallback, useEffect, useState } from "react";

import s from "./Sidebar.module.css";

const Sidebar = ({ chats, activeChatId, onActiveChatIdChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEscapePress = (event) => {
    if (isOpen && event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleChatClick = (chatId) => {
    onActiveChatIdChange(chatId);
    if (isOpen) {
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
              onClick={() => handleChatClick(chat.id)}
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
