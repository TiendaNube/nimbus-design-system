import { parseLinearGradient } from "./cssParser";
import { GradientStop } from "../types";

describe("cssParser utilities", () => {
  describe("parseLinearGradient", () => {
    it("should parse linear gradient with percentages correctly", () => {
      const cssGradient = "linear-gradient(90deg, #0050C3 5%, #4736B4 40%, #D8446E 95%)";
      const expected: GradientStop[] = [
        { color: "#0050C3", offset: "5%" },
        { color: "#4736B4", offset: "40%" },
        { color: "#D8446E", offset: "95%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should parse linear gradient with rgba colors and percentages", () => {
      const cssGradient = "linear-gradient(45deg, rgba(0,80,195,1) 10%, rgba(71,54,180,0.8) 50%, rgba(216,68,110,1) 90%)";
      const expected: GradientStop[] = [
        { color: "rgba(0,80,195,1)", offset: "10%" },
        { color: "rgba(71,54,180,0.8)", offset: "50%" },
        { color: "rgba(216,68,110,1)", offset: "90%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should parse linear gradient without percentages and distribute evenly", () => {
      const cssGradient = "linear-gradient(180deg, #FF0000, #00FF00, #0000FF)";
      const expected: GradientStop[] = [
        { color: "#FF0000", offset: "0%" },
        { color: "#00FF00", offset: "50%" },
        { color: "#0000FF", offset: "100%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should parse linear gradient with single color without percentage", () => {
      const cssGradient = "linear-gradient(0deg, #FF0000)";
      const expected: GradientStop[] = [
        { color: "#FF0000", offset: "100%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should parse linear gradient with two colors without percentages", () => {
      const cssGradient = "linear-gradient(270deg, #FF0000, #0000FF)";
      const expected: GradientStop[] = [
        { color: "#FF0000", offset: "0%" },
        { color: "#0000FF", offset: "100%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should parse linear gradient with mixed percentage and non-percentage colors", () => {
      const cssGradient = "linear-gradient(45deg, #FF0000 20%, #00FF00, #0000FF 80%)";
      const expected: GradientStop[] = [
        { color: "#FF0000", offset: "20%" },
        { color: "#00FF00", offset: "50%" }, // Second color gets calculated position
        { color: "#0000FF", offset: "80%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should handle linear gradient with extra spaces", () => {
      const cssGradient = "linear-gradient( 90deg , #0050C3  5% , #4736B4  40% , #D8446E  95% )";
      const expected: GradientStop[] = [
        { color: "#0050C3", offset: "5%" },
        { color: "#4736B4", offset: "40%" },
        { color: "#D8446E", offset: "95%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should handle named colors", () => {
      const cssGradient = "linear-gradient(90deg, red 0%, blue 50%, green 100%)";
      const expected: GradientStop[] = [
        { color: "red", offset: "0%" },
        { color: "blue", offset: "50%" },
        { color: "green", offset: "100%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });

    it("should return empty array for invalid gradient string", () => {
      expect(parseLinearGradient("invalid-gradient-string")).toEqual([]);
      expect(parseLinearGradient("")).toEqual([]);
      expect(parseLinearGradient("background-color: red")).toEqual([]);
      expect(parseLinearGradient("radial-gradient(circle, red, blue)")).toEqual([]);
    });

    it("should return empty array for gradient without color stops", () => {
      expect(parseLinearGradient("linear-gradient(90deg)")).toEqual([]);
    });

    it("should handle complex rgba values with commas", () => {
      const cssGradient = "linear-gradient(90deg, rgba(255,0,0,0.8) 0%, rgba(0,255,0,0.6) 50%, rgba(0,0,255,1) 100%)";
      const expected: GradientStop[] = [
        { color: "rgba(255,0,0,0.8)", offset: "0%" },
        { color: "rgba(0,255,0,0.6)", offset: "50%" },
        { color: "rgba(0,0,255,1)", offset: "100%" }
      ];

      const result = parseLinearGradient(cssGradient);
      expect(result).toEqual(expected);
    });
  });
}); 
