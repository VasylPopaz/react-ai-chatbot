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
  return (
    <div className={s.sidebar}>
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
  );
};

export default Sidebar;
