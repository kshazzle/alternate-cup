const FOOTBALL_SIGNALS = [
  /\bfootball\b/i,
  /\bsoccer\b/i,
  /\bfifa\b/i,
  /\bworld cup\b/i,
  /\beuros?\b/i,
  /\bchampions league\b/i,
  /\b(copa america|afcon|uefa|premier league|la liga|serie a|bundesliga)\b/i,
  /\b(goal|penalty|final|semifinal|quarter-?final|knockout|qualif(?:y|ied|ication))\b/i,
  /\b(messi|ronaldo|neymar|mbapp[eé]|haaland|modri[cć]|kane|salah|lewandowski|de bruyne|iniesta|xavi|pele|maradona)\b/i,
  /\b(brazil|argentina|portugal|spain|france|germany|england|italy|netherlands|belgium|mexico|japan|senegal|morocco|india|iceland|scotland|usa|uruguay|croatia)\b/i,
];

const OFF_TOPIC_SIGNALS = [
  /\b(sort|array|algorithm|javascript|typescript|python|java\b|react|sql|database|leetcode|homework|essay|recipe|bitcoin|crypto)\b/i,
  /\bo\(\s*n\b/i,
  /\bhow do i\b/i,
  /\bwrite (?:me )?(?:a |an )?(?:code|script|function|essay)\b/i,
  /\bignore (?:previous|all) instructions\b/i,
  /\b(system prompt|jailbreak)\b/i,
];

export type ScenarioTopicAssessment = {
  ok: boolean;
  message?: string;
};

export function assessScenarioTopic(scenario: string): ScenarioTopicAssessment {
  const text = scenario.trim();

  const footballHits = FOOTBALL_SIGNALS.filter((pattern) => pattern.test(text)).length;
  const offTopicHits = OFF_TOPIC_SIGNALS.filter((pattern) => pattern.test(text)).length;

  if (offTopicHits > 0 && footballHits === 0) {
    return {
      ok: false,
      message:
        "What If? World Cup Edition only generates FIFA World Cup what-if scenarios. Try something like: What if India qualified for the 2026 World Cup?",
    };
  }

  if (footballHits === 0) {
    return {
      ok: false,
      message:
        "Describe a football what-if scenario with teams, players, or a World Cup twist.",
    };
  }

  return { ok: true };
}
