import { describe, expect, it } from "vitest";
import { universeOutputSchema } from "./universe-output.schema";

const validUniverse = {
  title: "India's Impossible 2026 Run",
  summary: "India qualifies for the 2026 World Cup and changes Asian football forever.",
  butterflyTimeline: [
    "India qualifies from the expanded AFC pathway",
    "A new domestic TV deal floods academies with money",
    "European clubs scout Indian midfielders aggressively",
    "The 2030 Asian Cup becomes a global media event",
  ],
  groupStage: [
    "India steals a late draw against Mexico in the opener",
    "Brazil rotates heavily but still tops the group",
    "India beats New Zealand to reach the knockouts",
    "Mexico exits early after a VAR controversy",
  ],
  knockoutStage: [
    "India loses narrowly to Spain in the round of 16",
    "Brazil beats France in a chaotic semifinal",
    "Spain edges Germany on penalties",
    "Brazil defeats Spain 2-1 in the final",
  ],
  winner: "Brazil",
  goldenBoot: "Vinicius Junior",
  goldenBall: "Pedri",
  youngPlayer: "Lamine Yamal",
  fairPlay: "Japan",
  headlines: [
    "India's World Cup Debut Rewrites Football's Map",
    "Brazil Survives Spain To Lift Sixth Crown",
    "AFC Investment Boom Begins After India Breakthrough",
    "Mexico Demands Answers After Group Stage Exit",
    "Yamal And Pedri Turn 2026 Into Spain's Relaunch",
  ],
  fanReactions: [
    { handle: "BlueTigersFC", quote: "India at a World Cup still feels unreal." },
    { handle: "StoppageTimeFC", quote: "That late equalizer changed my life." },
    { handle: "CopaCommentary", quote: "Brazil winning again just feels inevitable." },
    { handle: "AFCUnited", quote: "AFC football is never being ignored again." },
    { handle: "MidfieldMuseum", quote: "Spain's midfield was art." },
    { handle: "VARWatch", quote: "Mexico fans deserved better than that VAR call." },
    { handle: "KitCulture", quote: "The India away kit is already sold out everywhere." },
    { handle: "GoldenBootWatch", quote: "Vinicius Golden Boot was written in the stars." },
    { handle: "FairPlayJapan", quote: "Japan Fair Play again, no surprise." },
    { handle: "TimelineSplit", quote: "This timeline is pure cinema." },
  ],
  legacy:
    "India's qualification turns the World Cup into a truly global commercial engine. European scouting networks expand across South Asia, FIFA leans harder into expanded tournaments, and the old assumption that football's future belongs only to established powers finally breaks.",
};

describe("universeOutputSchema", () => {
  it("accepts a complete generated universe", () => {
    expect(universeOutputSchema.parse(validUniverse).winner).toBe("Brazil");
  });

  it("requires exactly five headlines and ten fan reactions", () => {
    const invalid = {
      ...validUniverse,
      headlines: validUniverse.headlines.slice(0, 4),
      fanReactions: validUniverse.fanReactions.slice(0, 9),
    };

    expect(universeOutputSchema.safeParse(invalid).success).toBe(false);
  });
});
