import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY || "",
  dangerouslyAllowBrowser: true,
  maxRetries: 0,
});

export class Assistant {
  #model;
  constructor(model = "gpt-3.5-turbo") {
    this.#model = model;
  }

  async chat(content, history) {
    const result = await openai.responses.create({
      model: this.#model,
      input: [...history, { role: "user", content }],
    });
    return result.output_text;
  }

  async *chatStream(content, history) {
    const result = await openai.chat.completions.create({
      model: this.#model,
      messages: [...history, { role: "user", content }],
      stream: true,
    });

    for await (const chunk of result) {
      yield chunk.choices[0]?.delta?.content || "";
    }
  }
}
