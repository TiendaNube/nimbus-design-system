import React, { type ReactNode } from "react";
import { getGradientStops, createSvgGradientDef } from "./gradientFactory";
import { type GradientTypes } from "../types";
import * as cssParser from "../cssParser";
import * as svgManipulation from "../svgManipulation";

type ElementProps = Record<string, unknown>;

const getChildren = (props: ElementProps): ReactNode[] =>
  React.Children.toArray(props.children as ReactNode);

// Mock the dependencies
jest.mock("../cssParser");
jest.mock("../svgManipulation");
jest.mock("@nimbus-ds/styles", () => ({
  gradients: {
    aiGenerativeInteractive:
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
      const result = getGradientStops("unknown" as GradientTypes);

      expect(result).toEqual([]);
      expect(mockParseLinearGradient).not.toHaveBeenCalled();
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
      const resultProps = result.props as ElementProps;

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("linearGradient");
      expect(resultProps.id).toBe("test-gradient-id");
      expect(resultProps.gradientUnits).toBe("objectBoundingBox");
      expect(resultProps.x1).toBe("0%");
      expect(resultProps.y1).toBe("0%");
      expect(resultProps.x2).toBe("100%");
      expect(resultProps.y2).toBe("0%");
    });

    it("should create horizontal linear gradient definition when direction is horizontal", () => {
      const result = createSvgGradientDef(
        "test-gradient-id",
        "linear",
        "horizontal"
      );
      const resultProps = result.props as ElementProps;

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("linearGradient");
      expect(resultProps.x1).toBe("0%");
      expect(resultProps.y1).toBe("0%");
      expect(resultProps.x2).toBe("100%");
      expect(resultProps.y2).toBe("0%");
    });

    it("should create vertical linear gradient definition when direction is vertical", () => {
      const result = createSvgGradientDef(
        "test-gradient-id",
        "linear",
        "vertical"
      );
      const resultProps = result.props as ElementProps;

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("linearGradient");
      expect(resultProps.x1).toBe("0%");
      expect(resultProps.y1).toBe("0%");
      expect(resultProps.x2).toBe("0%");
      expect(resultProps.y2).toBe("100%");
    });

    it("should create gradient with correct gradient stops", () => {
      const result = createSvgGradientDef("test-gradient-id", "linear");
      const resultProps = result.props as ElementProps;
      const children = getChildren(resultProps);

      expect(children).toHaveLength(3);

      // Check first stop
      const firstChild = children[0] as React.ReactElement;
      const firstChildProps = firstChild.props as ElementProps;
      expect(firstChild.type).toBe("stop");
      expect(firstChildProps.offset).toBe("5%");
      expect(firstChildProps.stopColor).toBe("#0050C3");

      // Check second stop
      const secondChild = children[1] as React.ReactElement;
      const secondChildProps = secondChild.props as ElementProps;
      expect(secondChild.type).toBe("stop");
      expect(secondChildProps.offset).toBe("40%");
      expect(secondChildProps.stopColor).toBe("#4736B4");

      // Check third stop
      const thirdChild = children[2] as React.ReactElement;
      const thirdChildProps = thirdChild.props as ElementProps;
      expect(thirdChild.type).toBe("stop");
      expect(thirdChildProps.offset).toBe("95%");
      expect(thirdChildProps.stopColor).toBe("#D8446E");
    });

    it("should handle gradient with no stops", () => {
      mockParseLinearGradient.mockReturnValue([]);

      const result = createSvgGradientDef("test-gradient-id", "linear");
      const resultProps = result.props as ElementProps;
      const children = getChildren(resultProps);

      expect(React.isValidElement(result)).toBe(true);
      expect(children).toHaveLength(0);
    });
  });
});
