import OpenAI from "openai";
import { baseUrl } from "../utils/absolute-url";

function extractJson(raw: string): string {
  // Strip <think>...</think> reasoning blocks that some models emit before JSON.
  const stripped = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // Walk the string and collect every complete top-level {...} block,
  // then return the largest one (the actual universe JSON, not a small helper object).
  let best = "";
  let i = 0;
  while (i < stripped.length) {
    if (stripped[i] === "{") {
      let depth = 0;
      let j = i;
      while (j < stripped.length) {
        if (stripped[j] === "{") depth++;
        else if (stripped[j] === "}") {
          depth--;
          if (depth === 0) {
            const candidate = stripped.slice(i, j + 1);
            if (candidate.length > best.length) best = candidate;
            i = j + 1;
            break;
          }
        }
        j++;
      }
      if (depth !== 0) break;
    } else {
      i++;
    }
  }

  return best || stripped;
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
