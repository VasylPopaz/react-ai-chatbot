import { GoogleGenAI } from "@google/genai";

const googleai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY || "",
});

export class Assistant {
  #chat;
  constructor(model = "gemini-2.5-flash-lite") {
    this.#chat = googleai.chats.create({ model });
  }

  async chat(content) {
    try {
      const result = await this.#chat.sendMessage({ message: content });
      return result.text;
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  async *chatStream(content) {
    try {
      const result = await this.#chat.sendMessageStream({ message: content });

      for await (const chunk of result) {
        yield chunk.text;
      }
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  #parseError(error) {
    try {
      if (typeof error?.message === "string") {
        try {
          const parsed = JSON.parse(error.message);
          if (
            parsed?.error?.message &&
            typeof parsed.error.message === "string"
          ) {
            try {
              const innerParsed = JSON.parse(parsed.error.message);
              return innerParsed?.error || parsed.error;
            } catch {
              return parsed.error;
            }
          }
          return parsed?.error || parsed?.message || error;
        } catch {
          return error;
        }
      }

      if (error?.error?.message) {
        return error.error;
      }

      return "Unknown error occurred";
    } catch {
      return "Error parsing server response";
    }
  }
}
