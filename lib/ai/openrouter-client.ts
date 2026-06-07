import OpenAI from "openai";
import { baseUrl } from "../utils/absolute-url";

function extractJson(raw: string): string {
  const start = raw.indexOf("{");
  if (start === -1) return raw;
  let depth = 0;
  for (let i = start; i < raw.length; i++) {
    if (raw[i] === "{") depth++;
    else if (raw[i] === "}") {
      depth--;
      if (depth === 0) return raw.slice(start, i + 1);
    }
  }
  return raw.slice(start);
}

export type ModelClient = {
  complete(prompt: { system: string; user: string }): Promise<string>;
};

export function getOpenRouterModel() {
  return process.env.OPENROUTER_MODEL ?? "google/gemini-flash-1.5";
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
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? baseUrl(),
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
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new Error("OpenRouter returned an empty response");
      }

      return extractJson(content);
    },
  };
}
