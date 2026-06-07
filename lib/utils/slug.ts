const STOP_WORDS = new Set(["what", "if", "for", "the", "a", "an", "of", "to"]);

export function createUniverseSlug(scenario: string, suffix?: string) {
  const base = scenario
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word && !STOP_WORDS.has(word))
    .join("-");

  return [base || "alternate-universe", suffix].filter(Boolean).join("-");
}
