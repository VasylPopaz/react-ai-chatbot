import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import s from "./Controls.module.css";

const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#1f1f1f"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
};

const Controls = ({ isDisabled = false, onSend }) => {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isDisabled) {
      textareaRef.current.focus();
    }
  }, [isDisabled]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleContentSend = () => {
    if (content.trim() !== "") {
      onSend(content);
      setContent("");
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  };

  return (
    <div className={s.controls}>
      <div className={s.textareaContainer}>
        <TextareaAutosize
          ref={textareaRef}
          className={s.textarea}
          placeholder="Message AI Chatbot"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
          minRows={1}
          maxRows={4}
          disabled={isDisabled}
        ></TextareaAutosize>
      </div>
      <button
        className={s.button}
        type="button"
        onClick={handleContentSend}
        disabled={isDisabled}
      >
        <SendIcon />
      </button>
    </div>
  );
};

export default Controls;
