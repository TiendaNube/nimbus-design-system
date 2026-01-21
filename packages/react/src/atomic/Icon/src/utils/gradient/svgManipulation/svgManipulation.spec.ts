import React, { ReactNode } from "react";
import {
  generateGradientId,
  injectGradientDefs,
  processElement,
} from "./svgManipulation";
import * as colorValidation from "../colorValidation";

type ElementProps = Record<string, unknown>;

const getChildren = (props: ElementProps): ReactNode[] =>
  React.Children.toArray(props.children as ReactNode);

// Mock the colorValidation utilities
jest.mock("../colorValidation");

const mockCanUseGradient =
  colorValidation.canUseGradient as jest.MockedFunction<
    typeof colorValidation.canUseGradient
  >;
const mockIsValidColorValue =
  colorValidation.isValidColorValue as jest.MockedFunction<
    typeof colorValidation.isValidColorValue
  >;

describe("svgManipulation utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateGradientId", () => {
    it("should generate a unique gradient ID with correct prefix", () => {
      const id1 = generateGradientId();
      const id2 = generateGradientId();

      expect(id1).toMatch(/^nimbus-gradient-[a-z0-9]{9}$/);
      expect(id2).toMatch(/^nimbus-gradient-[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    });

    it("should generate IDs with correct length", () => {
      const id = generateGradientId();
      expect(id.length).toBe(25); // "nimbus-gradient-" (16) + 9 random chars
    });
  });

  describe("injectGradientDefs", () => {
    it("should inject gradient definitions as first child", () => {
      const originalSvg = React.createElement(
        "svg",
        {},
        React.createElement("path", { d: "M10 10" }),
        React.createElement("circle", { r: "5" })
      );

      const gradientDef = React.createElement("linearGradient", {
        id: "test-gradient",
      });

      const result = injectGradientDefs(originalSvg, gradientDef);

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("svg");

      const resultProps = result.props as ElementProps;
      const children = getChildren(resultProps);
      expect(children).toHaveLength(3);

      // Check that defs is first child
      const defsChild = children[0] as React.ReactElement;
      const defsProps = defsChild.props as ElementProps;
      expect(defsChild.type).toBe("defs");
      expect(defsProps.children).toBe(gradientDef);

      // Check that original children are preserved
      const pathChild = children[1] as React.ReactElement;
      const pathProps = pathChild.props as ElementProps;
      expect(pathChild.type).toBe("path");
      expect(pathProps.d).toBe("M10 10");

      const circleChild = children[2] as React.ReactElement;
      const circleProps = circleChild.props as ElementProps;
      expect(circleChild.type).toBe("circle");
      expect(circleProps.r).toBe("5");
    });

    it("should handle SVG with no existing children", () => {
      const originalSvg = React.createElement("svg", {});
      const gradientDef = React.createElement("linearGradient", {
        id: "test-gradient",
      });

      const result = injectGradientDefs(originalSvg, gradientDef);

      const resultProps = result.props as ElementProps;
      const children = getChildren(resultProps);
      expect(children).toHaveLength(1);
      const defsChild = children[0] as React.ReactElement;
      const defsProps = defsChild.props as ElementProps;
      expect(defsChild.type).toBe("defs");
      expect(defsProps.children).toBe(gradientDef);
    });

    it("should preserve original SVG props", () => {
      const originalSvg = React.createElement("svg", {
        width: "100",
        height: "100",
        viewBox: "0 0 100 100",
      });
      const gradientDef = React.createElement("linearGradient", {
        id: "test-gradient",
      });

      const result = injectGradientDefs(originalSvg, gradientDef);
      const resultProps = result.props as ElementProps;

      expect(resultProps.width).toBe("100");
      expect(resultProps.height).toBe("100");
      expect(resultProps.viewBox).toBe("0 0 100 100");
    });
  });

  describe("processElement", () => {
    const testGradientId = "test-gradient-id";

    beforeEach(() => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);
    });

    it("should return element as-is if not a valid React element", () => {
      const nonElement = "not an element";
      const result = processElement(nonElement as any, testGradientId);
      expect(result).toBe(nonElement);
    });

    it("should replace fill attribute with gradient URL when canUseGradient returns true", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("path", {
        fill: "#FF0000",
        d: "M10 10",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.fill).toBe(`url(#${testGradientId})`);
      expect(resultProps.d).toBe("M10 10");
    });

    it("should replace stroke attribute with gradient URL when canUseGradient returns true", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("path", {
        stroke: "#FF0000",
        d: "M10 10",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.stroke).toBe(`url(#${testGradientId})`);
      expect(resultProps.d).toBe("M10 10");
    });

    it("should replace both fill and stroke when both can use gradient", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("path", {
        fill: "#FF0000",
        stroke: "#00FF00",
        d: "M10 10",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.fill).toBe(`url(#${testGradientId})`);
      expect(resultProps.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should not replace fill/stroke when canUseGradient returns false", () => {
      mockCanUseGradient.mockReturnValue(false);

      const element = React.createElement("path", {
        fill: "none",
        stroke: "transparent",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.fill).toBe("none");
      expect(resultProps.stroke).toBe("transparent");
    });

    it("should replace currentColor fill with gradient URL", () => {
      const element = React.createElement("path", {
        fill: "currentColor",
        d: "M10 10",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.fill).toBe(`url(#${testGradientId})`);
    });

    it("should replace currentColor stroke with gradient URL", () => {
      const element = React.createElement("path", {
        stroke: "currentColor",
        d: "M10 10",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should replace both currentColor fill and stroke", () => {
      const element = React.createElement("path", {
        fill: "currentColor",
        stroke: "currentColor",
        d: "M10 10",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.fill).toBe(`url(#${testGradientId})`);
      expect(resultProps.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should process children recursively", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement(
        "g",
        {},
        React.createElement("path", { fill: "#FF0000", d: "M10 10" }),
        React.createElement("circle", { stroke: "#00FF00", r: "5" })
      );

      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      const children = getChildren(resultProps);
      const child0Props = (children[0] as React.ReactElement)
        .props as ElementProps;
      const child1Props = (children[1] as React.ReactElement)
        .props as ElementProps;
      expect(child0Props.fill).toBe(`url(#${testGradientId})`);
      expect(child1Props.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should handle non-React element children", () => {
      const element = React.createElement(
        "g",
        {},
        React.createElement("path", { fill: "#FF0000" }),
        "text content",
        null,
        undefined
      );

      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      // React.Children.toArray filters out null/undefined, so we only get the path and text
      const children = getChildren(resultProps);
      expect(children).toHaveLength(2);
      const child0Props = (children[0] as React.ReactElement)
        .props as ElementProps;
      expect(child0Props.fill).toBe(`url(#${testGradientId})`);
      expect(children[1]).toBe("text content");
    });

    it("should handle element with no children", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("path", {
        fill: "#FF0000",
        d: "M10 10",
      });
      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.fill).toBe(`url(#${testGradientId})`);
      expect(resultProps.children).toBeUndefined();
    });

    it("should preserve other props unchanged", () => {
      const element = React.createElement("path", {
        fill: "#FF0000",
        d: "M10 10",
        strokeWidth: "2",
        opacity: "0.5",
        className: "test-class",
      });

      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      expect(resultProps.d).toBe("M10 10");
      expect(resultProps.strokeWidth).toBe("2");
      expect(resultProps.opacity).toBe("0.5");
      expect(resultProps.className).toBe("test-class");
    });

    it("should handle complex nested structure", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement(
        "svg",
        {},
        React.createElement(
          "g",
          {},
          React.createElement("path", { fill: "#FF0000" }),
          React.createElement(
            "g",
            {},
            React.createElement("circle", { stroke: "#00FF00" })
          )
        )
      );

      const result = processElement(element, testGradientId);
      const resultProps = result.props as ElementProps;

      // Navigate to nested elements and check they were processed
      const children = getChildren(resultProps);
      const g1 = children[0] as React.ReactElement;
      const g1Props = g1.props as ElementProps;
      const g1Children = getChildren(g1Props);
      const path = g1Children[0] as React.ReactElement;
      const g2 = g1Children[1] as React.ReactElement;
      const g2Props = g2.props as ElementProps;
      const g2Children = getChildren(g2Props);
      const circle = g2Children[0] as React.ReactElement;
      const pathProps = path.props as ElementProps;
      const circleProps = circle.props as ElementProps;

      expect(pathProps.fill).toBe(`url(#${testGradientId})`);
      expect(circleProps.stroke).toBe(`url(#${testGradientId})`);
    });
  });
});
