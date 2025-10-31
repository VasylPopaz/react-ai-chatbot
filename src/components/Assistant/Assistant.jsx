import { useEffect, useState } from "react";

import { Assistant as XAIAssistant } from "../../assistants/xai";
import { Assistant as OpenAIAssistant } from "../../assistants/openai";
import { Assistant as GoogleAIAssistant } from "../../assistants/googleai";
import { Assistant as DeepSeekAIAssistant } from "../../assistants/deepseekai";
import { Assistant as AnthropicAIAssistant } from "../../assistants/antropical";

import s from "./Assistant.module.css";

const assistantMap = {
  googleai: GoogleAIAssistant,
  openai: OpenAIAssistant,
  deepseekai: DeepSeekAIAssistant,
  anthropicai: AnthropicAIAssistant,
  xai: XAIAssistant,
};

const Assistant = ({ onAssistantChange }) => {
  const [value, setValue] = useState("googleai");

  useEffect(() => {
    const AssistantClass = assistantMap[value];

    if (!AssistantClass) {
      throw new Error(`Unknown assistant: ${value} `);
    }
    onAssistantChange(new AssistantClass());
  }, [value]);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={s.assistant}>
      <span>Assistant:</span>
      <select name="" id="" defaultValue={value} onChange={handleValueChange}>
        <option value="googleai">Google AI</option>
        <option value="openai">OpenAI</option>
        <option value="deepseekai">DeepSeek AI</option>
        <option value="anthropicai">Anthropic AI</option>
        <option value="xai">X AI</option>
      </select>
    </div>
  );
};

export default Assistant;
