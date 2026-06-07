export function parseJsonObject(input: string): unknown {
  const trimmed = input.trim();

  let parsed: unknown;

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    parsed = JSON.parse(trimmed);
  } else {
    const start = input.indexOf("{");
    const end = input.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("No JSON object found in model response");
    }

    parsed = JSON.parse(input.slice(start, end + 1));
  }

  // Unwrap single-key wrapper objects e.g. {"universe": {...}} or {"result": {...}}
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    const keys = Object.keys(parsed as Record<string, unknown>);
    if (keys.length === 1) {
      const inner = (parsed as Record<string, unknown>)[keys[0]];
      if (inner && typeof inner === "object" && !Array.isArray(inner)) {
        return inner;
      }
    }
  }

  return parsed;
}
