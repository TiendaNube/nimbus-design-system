import { gradients } from "@nimbus-ds/styles";
import { parseLinearGradient } from "../cssParser";

describe("GIVEN the real AI linear gradient from @nimbus-ds/styles", () => {
  it("THEN the Icon gradient parser reads its three color stops", () => {
    const stops = parseLinearGradient(gradients.aiGenerativeLinearInteractive);

    expect(stops).toHaveLength(3);
    expect(stops.map((stop) => stop.offset)).toEqual([
      "28.22%",
      "49.27%",
      "83.12%"
    ]);
    stops.forEach((stop) => {
      expect(stop.color).toMatch(
        /^var\(--nimbus-gradients-aiGenerativeLinear-/
      );
    });
  });
});
