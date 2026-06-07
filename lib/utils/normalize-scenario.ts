export function normalizeScenario(scenario: string) {
  return scenario.trim().replace(/\s+/g, " ").toLowerCase();
}
