import { useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";

import s from "./Messages.module.css";

const WELCOME_MESSAGE_GROUP = [
  {
    role: "assistant",
    content: "Hello! How can I help you?",
  },
];

const Messages = ({ messages }) => {
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
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.role === "user") {
      messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={s.messages}>
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

export default Messages;
