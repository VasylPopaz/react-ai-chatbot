import s from "./Chat.module.css";

const Chat = ({ messages }) => {
  return (
    <div className={s.chat}>
      {messages.map(({ role, content }, index) => (
        <p className={s.message} key={index} data-role={role}>
          {content}
        </p>
      ))}
    </div>
  );
};

export default Chat;
