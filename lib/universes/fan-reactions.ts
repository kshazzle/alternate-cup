export type FanReaction = {
  handle: string;
  quote: string;
};

const FALLBACK_HANDLES = [
  "FutbolBruto",
  "TacticsTavern",
  "WorldCupNerd",
  "PitchSidePulse",
  "UltrasArchive",
  "MidnightKickoff",
  "CopaCommentary",
  "StoppageTimeFC",
  "GoldenBootWatch",
  "AwayEndVoices",
];

export function normalizeFanReaction(
  reaction: string | FanReaction,
  index = 0,
): FanReaction {
  if (typeof reaction !== "string") {
    return {
      handle: sanitizeHandle(reaction.handle),
      quote: reaction.quote.trim(),
    };
  }

  const trimmed = reaction.trim();
  const prefixed = trimmed.match(/^@?([A-Za-z][A-Za-z0-9_]{1,23}):\s*(.+)$/);
  if (prefixed) {
    return {
      handle: sanitizeHandle(prefixed[1]),
      quote: prefixed[2].trim(),
    };
  }

  return {
    handle: FALLBACK_HANDLES[index % FALLBACK_HANDLES.length],
    quote: trimmed,
  };
}

export function normalizeFanReactions(reactions: Array<string | FanReaction>) {
  return reactions.map((reaction, index) => normalizeFanReaction(reaction, index));
}

export function fanReactionText(reactions: Array<string | FanReaction>) {
  return normalizeFanReactions(reactions)
    .map((reaction) => reaction.quote)
    .join(" ");
}

function sanitizeHandle(handle: string) {
  const cleaned = handle.replace(/^@/, "").trim();
  return cleaned.length > 0 ? cleaned : FALLBACK_HANDLES[0];
}
