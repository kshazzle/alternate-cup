import { describe, expect, it } from "vitest";
import { parseJsonObject } from "./safe-json";

describe("parseJsonObject", () => {
  it("parses a direct JSON object string", () => {
    expect(parseJsonObject('{"title":"Alternate Cup"}')).toEqual({
      title: "Alternate Cup",
    });
  });

  it("extracts the first JSON object from wrapped model text", () => {
    expect(parseJsonObject('Here is the universe:\n{"winner":"India"}\nDone.')).toEqual({
      winner: "India",
    });
  });

  it("throws a clear error when no JSON object exists", () => {
    expect(() => parseJsonObject("not json")).toThrow("No JSON object found");
  });
});
