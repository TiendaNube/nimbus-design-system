import React from "react";
import { generateGradientId, injectGradientDefs, processElement } from "./svgManipulation";
import * as colorValidation from "../colorValidation";

// Mock the colorValidation utilities
jest.mock("../colorValidation");

const mockCanUseGradient = colorValidation.canUseGradient as jest.MockedFunction<typeof colorValidation.canUseGradient>;
const mockIsValidColorValue = colorValidation.isValidColorValue as jest.MockedFunction<typeof colorValidation.isValidColorValue>;

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
      const originalSvg = React.createElement("svg", {}, 
        React.createElement("path", { d: "M10 10" }),
        React.createElement("circle", { r: "5" })
      );
      
      const gradientDef = React.createElement("linearGradient", { id: "test-gradient" });

      const result = injectGradientDefs(originalSvg, gradientDef);

      expect(React.isValidElement(result)).toBe(true);
      expect(result.type).toBe("svg");
      
      const children = React.Children.toArray(result.props.children);
      expect(children).toHaveLength(3);
      
      // Check that defs is first child
      const defsChild = children[0] as React.ReactElement;
      expect(defsChild.type).toBe("defs");
      expect(defsChild.props.children).toBe(gradientDef);
      
      // Check that original children are preserved
      const pathChild = children[1] as React.ReactElement;
      expect(pathChild.type).toBe("path");
      expect(pathChild.props.d).toBe("M10 10");
      
      const circleChild = children[2] as React.ReactElement;
      expect(circleChild.type).toBe("circle");
      expect(circleChild.props.r).toBe("5");
    });

    it("should handle SVG with no existing children", () => {
      const originalSvg = React.createElement("svg", {});
      const gradientDef = React.createElement("linearGradient", { id: "test-gradient" });

      const result = injectGradientDefs(originalSvg, gradientDef);

      const children = React.Children.toArray(result.props.children);
      expect(children).toHaveLength(1);
      const defsChild = children[0] as React.ReactElement;
      expect(defsChild.type).toBe("defs");
      expect(defsChild.props.children).toBe(gradientDef);
    });

    it("should preserve original SVG props", () => {
      const originalSvg = React.createElement("svg", { 
        width: "100", 
        height: "100", 
        viewBox: "0 0 100 100" 
      });
      const gradientDef = React.createElement("linearGradient", { id: "test-gradient" });

      const result = injectGradientDefs(originalSvg, gradientDef);

      expect(result.props.width).toBe("100");
      expect(result.props.height).toBe("100");
      expect(result.props.viewBox).toBe("0 0 100 100");
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

      const element = React.createElement("path", { fill: "#FF0000", d: "M10 10" });
      const result = processElement(element, testGradientId);

      expect(result.props.fill).toBe(`url(#${testGradientId})`);
      expect(result.props.d).toBe("M10 10");
    });

    it("should replace stroke attribute with gradient URL when canUseGradient returns true", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("path", { stroke: "#FF0000", d: "M10 10" });
      const result = processElement(element, testGradientId);

      expect(result.props.stroke).toBe(`url(#${testGradientId})`);
      expect(result.props.d).toBe("M10 10");
    });

    it("should replace both fill and stroke when both can use gradient", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("path", { 
        fill: "#FF0000", 
        stroke: "#00FF00", 
        d: "M10 10" 
      });
      const result = processElement(element, testGradientId);

      expect(result.props.fill).toBe(`url(#${testGradientId})`);
      expect(result.props.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should not replace fill/stroke when canUseGradient returns false", () => {
      mockCanUseGradient.mockReturnValue(false);

      const element = React.createElement("path", { fill: "none", stroke: "transparent" });
      const result = processElement(element, testGradientId);

      expect(result.props.fill).toBe("none");
      expect(result.props.stroke).toBe("transparent");
    });

    it("should replace currentColor fill with gradient URL", () => {
      const element = React.createElement("path", { fill: "currentColor", d: "M10 10" });
      const result = processElement(element, testGradientId);

      expect(result.props.fill).toBe(`url(#${testGradientId})`);
    });

    it("should replace currentColor stroke with gradient URL", () => {
      const element = React.createElement("path", { stroke: "currentColor", d: "M10 10" });
      const result = processElement(element, testGradientId);

      expect(result.props.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should replace both currentColor fill and stroke", () => {
      const element = React.createElement("path", { 
        fill: "currentColor", 
        stroke: "currentColor", 
        d: "M10 10" 
      });
      const result = processElement(element, testGradientId);

      expect(result.props.fill).toBe(`url(#${testGradientId})`);
      expect(result.props.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should process children recursively", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("g", {},
        React.createElement("path", { fill: "#FF0000", d: "M10 10" }),
        React.createElement("circle", { stroke: "#00FF00", r: "5" })
      );

      const result = processElement(element, testGradientId);

      const children = React.Children.toArray(result.props.children);
      expect((children[0] as React.ReactElement).props.fill).toBe(`url(#${testGradientId})`);
      expect((children[1] as React.ReactElement).props.stroke).toBe(`url(#${testGradientId})`);
    });

    it("should handle non-React element children", () => {
      const element = React.createElement("g", {},
        React.createElement("path", { fill: "#FF0000" }),
        "text content",
        null,
        undefined
      );

      const result = processElement(element, testGradientId);

      // React.Children.toArray filters out null/undefined, so we only get the path and text
      const children = React.Children.toArray(result.props.children);
      expect(children).toHaveLength(2);
      expect((children[0] as React.ReactElement).props.fill).toBe(`url(#${testGradientId})`);
      expect(children[1]).toBe("text content");
    });

    it("should handle element with no children", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("path", { fill: "#FF0000", d: "M10 10" });
      const result = processElement(element, testGradientId);

      expect(result.props.fill).toBe(`url(#${testGradientId})`);
      expect(result.props.children).toBeUndefined();
    });

    it("should preserve other props unchanged", () => {
      const element = React.createElement("path", { 
        fill: "#FF0000",
        d: "M10 10",
        strokeWidth: "2",
        opacity: "0.5",
        className: "test-class"
      });
      
      const result = processElement(element, testGradientId);

      expect(result.props.d).toBe("M10 10");
      expect(result.props.strokeWidth).toBe("2");
      expect(result.props.opacity).toBe("0.5");
      expect(result.props.className).toBe("test-class");
    });

    it("should handle complex nested structure", () => {
      mockCanUseGradient.mockReturnValue(true);
      mockIsValidColorValue.mockReturnValue(true);

      const element = React.createElement("svg", {},
        React.createElement("g", {},
          React.createElement("path", { fill: "#FF0000" }),
          React.createElement("g", {},
            React.createElement("circle", { stroke: "#00FF00" })
          )
        )
      );

      const result = processElement(element, testGradientId);

      // Navigate to nested elements and check they were processed
      const children = React.Children.toArray(result.props.children);
      const g1 = children[0] as React.ReactElement;
      const g1Children = React.Children.toArray(g1.props.children);
      const path = g1Children[0] as React.ReactElement;
      const g2 = g1Children[1] as React.ReactElement;
      const g2Children = React.Children.toArray(g2.props.children);
      const circle = g2Children[0] as React.ReactElement;

      expect(path.props.fill).toBe(`url(#${testGradientId})`);
      expect(circle.props.stroke).toBe(`url(#${testGradientId})`);
    });
  });
}); 
