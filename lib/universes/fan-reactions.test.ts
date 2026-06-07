import { describe, expect, it } from "vitest";
import { normalizeFanReaction, normalizeFanReactions } from "./fan-reactions";

describe("normalizeFanReaction", () => {
  it("keeps structured reactions intact", () => {
    expect(normalizeFanReaction({ handle: "PortugalNoFim", quote: "What a final." })).toEqual({
      handle: "PortugalNoFim",
      quote: "What a final.",
    });
  });

  it("parses legacy string reactions with handles", () => {
    expect(normalizeFanReaction("@BrasilFutebol: VAR ruined everything.")).toEqual({
      handle: "BrasilFutebol",
      quote: "VAR ruined everything.",
    });
  });

  it("assigns believable fallback handles to legacy plain quotes", () => {
    const [first, second] = normalizeFanReactions([
      "India at a World Cup still feels unreal.",
      "That late equalizer changed my life.",
    ]);

    expect(first.handle).not.toMatch(/fan\d+/i);
    expect(second.handle).not.toMatch(/fan\d+/i);
    expect(first.quote).toContain("India");
  });
});
