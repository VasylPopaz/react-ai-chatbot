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
  const [value, setValue] = useState("googleai:gemini-2.0-flash");

  useEffect(() => {
    const [assistant, model] = value.split(":");
    const AssistantClass = assistantMap[assistant];

    if (!AssistantClass) {
      throw new Error(`Unknown assistant: ${value} or model: ${model}`);
    }
    onAssistantChange(new AssistantClass(model));
  }, [onAssistantChange, value]);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={s.assistant}>
      <span>Assistant: </span>
      <select defaultValue={value} onChange={handleValueChange}>
        <optgroup label="Google AI">
          <option value="googleai:gemini-2.0-flash">Gemini 2.0 Flash</option>
          <option value="googleai:gemini-2.0-flash-lite">
            Gemini 2.0 Flash-Lite
          </option>
        </optgroup>

        <optgroup label="Open AI">
          <option value="openai:gpt-3.5-turbo">ChatGPT 3.5 turbo</option>
          <option value="openai:chatgpt-4o-latest">ChatGPT-4o</option>
        </optgroup>

        <optgroup label="DeepSeek AI">
          <option value="deepseekai:deepseek-chat">DeepSeek-V3</option>
        </optgroup>

        <optgroup label="Anthropic AI">
          <option value="anthropicai:claude-3-5-haiku-latest">
            Claude 3.5 Haiku
          </option>
        </optgroup>

        <optgroup label="X AI">
          <option value="xai:grok-3-mini-latest">Grok 3 Mini</option>
        </optgroup>
      </select>
    </div>
  );
};

export default Assistant;
