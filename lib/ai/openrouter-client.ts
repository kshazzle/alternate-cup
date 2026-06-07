import OpenAI from "openai";

export type ModelClient = {
  complete(prompt: { system: string; user: string }): Promise<string>;
};

export function getOpenRouterModel() {
  return process.env.OPENROUTER_MODEL ?? "deepseek/deepseek-chat";
}

export function createOpenRouterClient(): ModelClient {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    defaultHeaders: {
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-OpenRouter-Title": process.env.OPENROUTER_SITE_NAME ?? "What If? World Cup Edition",
    },
  });

  return {
    async complete(prompt) {
      const response = await client.chat.completions.create({
        model: getOpenRouterModel(),
        messages: [
          { role: "system", content: prompt.system },
          { role: "user", content: prompt.user },
        ],
        temperature: 0.85,
        max_tokens: 4096,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new Error("OpenRouter returned an empty response");
      }

      return content;
    },
  };
}
