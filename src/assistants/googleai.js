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
    if (!this.#chat) throw new Error("Chat is not initialized");

    const result = await this.#chat.sendMessage({ message: content });
    return result.text;
  }

  async *chatStream(content) {
    if (!this.#chat) throw new Error("Chat is not initialized");

    const result = await this.#chat.sendMessageStream({ message: content });

    for await (const chunk of result) {
      yield chunk.text;
    }
    return this.#chat.sendMessage(content);
  }
}
