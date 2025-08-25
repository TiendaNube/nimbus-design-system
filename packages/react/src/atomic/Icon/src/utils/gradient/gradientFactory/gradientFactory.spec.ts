import React from "react";
import { getGradientStops, createSvgGradientDef } from "./gradientFactory";
import { GradientTypes } from "../types";
import * as cssParser from "../cssParser";
import * as svgManipulation from "../svgManipulation";

// Mock the dependencies
jest.mock("../cssParser");
jest.mock("../svgManipulation");
jest.mock("@nimbus-ds/styles", () => ({
  gradients: {
    aiGradientInteractive:
      "linear-gradient(90deg, #0050C3 5%, #4736B4 40%, #D8446E 95%)",
  },
}));

const mockParseLinearGradient =
  cssParser.parseLinearGradient as jest.MockedFunction<
    typeof cssParser.parseLinearGradient
  >;
const mockGenerateGradientId =
  svgManipulation.generateGradientId as jest.MockedFunction<
    typeof svgManipulation.generateGradientId
  >;

describe("gradientFactory utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getGradientStops", () => {
    it("should return gradient stops for linear gradient type", () => {
      const mockStops = [
        { color: "#0050C3", offset: "5%" },
        { color: "#4736B4", offset: "40%" },
        { color: "#D8446E", offset: "95%" },
      ];

      mockParseLinearGradient.mockReturnValue(mockStops);

      const result = getGradientStops("linear");

      expect(mockParseLinearGradient).toHaveBeenCalledWith(
        "linear-gradient(90deg, #0050C3 5%, #4736B4 40%, #D8446E 95%)"
      );
      expect(result).toEqual(mockStops);
    });

    it("should return empty array for unknown gradient type", () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      try {
        const result = getGradientStops("unknown" as GradientTypes);

        expect(result).toEqual([]);
        expect(mockParseLinearGradient).not.toHaveBeenCalled();
      } finally {
        warnSpy.mockRestore();
      }
    });
  });

  describe("createSvgGradientDef", () => {
    beforeEach(() => {
      mockGenerateGradientId.mockImplementation(() => "test-stop-id");
      mockParseLinearGradient.mockReturnValue([
        { color: "#0050C3", offset: "5%" },
        { color: "#4736B4", offset: "40%" },
        { color: "#D8446E", offset: "95%" },
      ]);
    });

    it("should create horizontal linear gradient definition by default", () => {
      const result = createSvgGradientDef("test-gradient-id", "linear");

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("linearGradient");
      expect(result.props.id).toBe("test-gradient-id");
      expect(result.props.gradientUnits).toBe("objectBoundingBox");
      expect(result.props.x1).toBe("0%");
      expect(result.props.y1).toBe("0%");
      expect(result.props.x2).toBe("100%");
      expect(result.props.y2).toBe("0%");
    });

    it("should create horizontal linear gradient definition when direction is horizontal", () => {
      const result = createSvgGradientDef(
        "test-gradient-id",
        "linear",
        "horizontal"
      );

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("linearGradient");
      expect(result.props.x1).toBe("0%");
      expect(result.props.y1).toBe("0%");
      expect(result.props.x2).toBe("100%");
      expect(result.props.y2).toBe("0%");
    });

    it("should create vertical linear gradient definition when direction is vertical", () => {
      const result = createSvgGradientDef(
        "test-gradient-id",
        "linear",
        "vertical"
      );

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("linearGradient");
      expect(result.props.x1).toBe("0%");
      expect(result.props.y1).toBe("0%");
      expect(result.props.x2).toBe("0%");
      expect(result.props.y2).toBe("100%");
    });

    it("should create gradient with correct gradient stops", () => {
      const result = createSvgGradientDef("test-gradient-id", "linear");

      expect(React.Children.count(result.props.children)).toBe(3);

      const children = React.Children.toArray(result.props.children);

      // Check first stop
      const firstChild = children[0] as React.ReactElement;
      expect(firstChild.type).toBe("stop");
      expect(firstChild.props.offset).toBe("5%");
      expect(firstChild.props.stopColor).toBe("#0050C3");

      // Check second stop
      const secondChild = children[1] as React.ReactElement;
      expect(secondChild.type).toBe("stop");
      expect(secondChild.props.offset).toBe("40%");
      expect(secondChild.props.stopColor).toBe("#4736B4");

      // Check third stop
      const thirdChild = children[2] as React.ReactElement;
      expect(thirdChild.type).toBe("stop");
      expect(thirdChild.props.offset).toBe("95%");
      expect(thirdChild.props.stopColor).toBe("#D8446E");
    });

    it("should handle gradient with no stops", () => {
      mockParseLinearGradient.mockReturnValue([]);

      const result = createSvgGradientDef("test-gradient-id", "linear");

      expect(React.isValidElement(result)).toBe(true);
      expect(React.Children.count(result.props.children)).toBe(0);
    });
  });
});
