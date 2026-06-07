export function parseJsonObject(input: string): unknown {
  const trimmed = input.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return JSON.parse(trimmed);
  }

  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model response");
  }

  return JSON.parse(input.slice(start, end + 1));
}
