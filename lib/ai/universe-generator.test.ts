import { describe, expect, it } from "vitest";
import { generateUniverseContent } from "./universe-generator";

const content = {
  title: "Messi's Spain Era",
  summary: "Messi chooses Spain and reshapes two footballing identities across a decade of World Cups.",
  butterflyTimeline: [
    "Messi commits to Spain at youth level",
    "Argentina loses its creative axis",
    "Spain wins the 2014 World Cup",
    "Germany rebuilds around a more direct style",
  ],
  groupStage: [
    "Spain controls every group match through Messi and Iniesta",
    "Argentina fails to beat Nigeria without late magic",
    "Germany rotates after an early qualification",
    "Brazil looks fragile despite topping its group",
  ],
  knockoutStage: [
    "Spain beats Chile after extra time",
    "Argentina exits in the round of 16",
    "Spain defeats Germany in the semifinal",
    "Spain beats Brazil 3-1 in the final",
  ],
  winner: "Spain",
  goldenBoot: "Lionel Messi",
  goldenBall: "Lionel Messi",
  youngPlayer: "Paul Pogba",
  fairPlay: "Japan",
  headlines: [
    "Messi Leads Spain To A Second World Cup",
    "Argentina Searches For Identity After Early Exit",
    "Brazil's Home Dream Ends In Maracana Silence",
    "Germany Rebuild Begins Earlier Than Expected",
    "La Masia Generation Claims Its Final Prize",
  ],
  fanReactions: [
    { handle: "LaRojaForever", quote: "This Spain team is illegal." },
    { handle: "AlbicelestePain", quote: "Argentina without Messi feels empty." },
    { handle: "TacticsTavern", quote: "That final was a tactical museum." },
    { handle: "FutbolBruto", quote: "Messi in red still looks strange." },
    { handle: "BundesReboot", quote: "Germany will be back, but different." },
    { handle: "SelecaoSofre", quote: "Brazil fans are never recovering." },
    { handle: "MidfieldMuseum", quote: "Iniesta and Messi together is unfair." },
    { handle: "YoungStarsWatch", quote: "Pogba young player makes sense." },
    { handle: "FairPlayJapan", quote: "Japan Fair Play again is wholesome." },
    { handle: "TimelineSplit", quote: "Football history just split in two." },
  ],
  legacy:
    "Messi's Spain career gives the country's golden generation a longer shadow while Argentina rebuilds around collective grit instead of genius. The GOAT debate changes entirely, Barcelona's politics become even more complicated, and South American football spends a decade trying to explain how its brightest son became Europe's defining World Cup figure.",
};

describe("generateUniverseContent", () => {
  it("validates model JSON before returning content", async () => {
    const result = await generateUniverseContent("What if Messi chose Spain?", {
      complete: async () => JSON.stringify(content),
    });

    expect(result.title).toBe("Messi's Spain Era");
  });

  it("rejects invalid model output", async () => {
    await expect(
      generateUniverseContent("What if Messi chose Spain?", {
        complete: async () => '{"title":"Too short"}',
      }),
    ).rejects.toThrow("generated universe did not match");
  });
});
