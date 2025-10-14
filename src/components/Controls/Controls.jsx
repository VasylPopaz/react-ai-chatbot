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

const Controls = () => {
  return (
    <div className={s.controls}>
      <div className={s.textAreaContainer}>
        <textarea
          className={s.textArea}
          placeholder="Message AI Chatbot"
        ></textarea>
      </div>
      <button className={s.button} type="button">
        <SendIcon />
      </button>
    </div>
  );
};

export default Controls;
