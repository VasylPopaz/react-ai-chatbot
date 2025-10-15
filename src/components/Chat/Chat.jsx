import s from "./Chat.module.css";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! How can I help you?",
};

const Chat = ({ messages }) => {
  return (
    <div className={s.chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <p className={s.message} key={index} data-role={role}>
          {content}
        </p>
      ))}
    </div>
  );
};

export default Chat;
