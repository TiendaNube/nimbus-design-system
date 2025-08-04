import {
  isValidColorValue,
  canUseGradient,
  isGradient,
} from "./colorValidation";

describe("colorValidation utilities", () => {
  describe("isValidColorValue", () => {
    it("should return true for valid color values", () => {
      expect(isValidColorValue("#FF0000")).toBe(true);
      expect(isValidColorValue("red")).toBe(true);
      expect(isValidColorValue("rgb(255, 0, 0)")).toBe(true);
      expect(isValidColorValue("rgba(255, 0, 0, 0.5)")).toBe(true);
      expect(isValidColorValue("currentColor")).toBe(true);
      expect(isValidColorValue("ai-generative")).toBe(true);
      expect(isValidColorValue("primary-textHigh")).toBe(true);
    });

    it("should return false for invalid color values", () => {
      expect(isValidColorValue(undefined)).toBe(false);
      expect(isValidColorValue("")).toBe(false);
      expect(isValidColorValue("none")).toBe(false);
      expect(isValidColorValue("transparent")).toBe(false);
    });
  });

  describe("canUseGradient", () => {
    it("should return true for valid colors that can use gradient", () => {
      expect(canUseGradient("#FF0000")).toBe(true);
      expect(canUseGradient("red")).toBe(true);
      expect(canUseGradient("rgb(255, 0, 0)")).toBe(true);
      expect(canUseGradient("rgba(255, 0, 0, 0.5)")).toBe(true);
      expect(canUseGradient("currentColor")).toBe(true);
      expect(canUseGradient("ai-generative")).toBe(true);
      expect(canUseGradient("primary-textHigh")).toBe(true);
    });

    it("should return false for colors that cannot use gradient", () => {
      expect(canUseGradient("")).toBe(false);
      expect(canUseGradient("none")).toBe(false);
      expect(canUseGradient("transparent")).toBe(false);
      expect(canUseGradient("url(#gradient-id)")).toBe(false);
      expect(canUseGradient("url('#some-gradient')")).toBe(false);
    });
  });

  describe("isGradient", () => {
    it("should return true for ai-generative color", () => {
      expect(isGradient("ai-generative")).toBe(true);
    });

    it("should return false for non-gradient colors", () => {
      expect(isGradient("red")).toBe(false);
      expect(isGradient("#FF0000")).toBe(false);
      expect(isGradient("rgb(255, 0, 0)")).toBe(false);
      expect(isGradient("currentColor")).toBe(false);
      expect(isGradient("primary-textHigh")).toBe(false);
      expect(isGradient("")).toBe(false);
      expect(isGradient("none")).toBe(false);
      expect(isGradient("transparent")).toBe(false);
    });
  });
});
