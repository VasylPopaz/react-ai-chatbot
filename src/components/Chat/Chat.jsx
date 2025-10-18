import { useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";

import s from "./Chat.module.css";

const WELCOME_MESSAGE_GROUP = [
  {
    role: "assistant",
    content: "Hello! How can I help you?",
  },
];

const Chat = ({ messages }) => {
  const messagesRef = useRef(null);
  const messagesGroups = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") {
          groups.push([]);
        }
        groups[groups.length - 1].push(message);
        return groups;
      }, []),
    [messages]
  );

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={s.chat}>
      {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map(
        (messages, groupIndex) => (
          // Group
          <div key={groupIndex} className={s.group}>
            {messages.map(({ role, content }, index) => (
              // Message
              <div className={s.message} key={index} data-role={role}>
                <Markdown>{content}</Markdown>
              </div>
            ))}
          </div>
        )
      )}

      <div ref={messagesRef} />
    </div>
  );
};

export default Chat;
