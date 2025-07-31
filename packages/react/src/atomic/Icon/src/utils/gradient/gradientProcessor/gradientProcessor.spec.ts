import React from "react";
import { applyGradientToSvg } from "./gradientProcessor";
import * as svgManipulation from "../svgManipulation";
import * as gradientFactory from "../gradientFactory";

// Mock the dependencies
jest.mock("../svgManipulation");
jest.mock("../gradientFactory");

const mockGenerateGradientId = svgManipulation.generateGradientId as jest.MockedFunction<typeof svgManipulation.generateGradientId>;
const mockInjectGradientDefs = svgManipulation.injectGradientDefs as jest.MockedFunction<typeof svgManipulation.injectGradientDefs>;
const mockProcessElement = svgManipulation.processElement as jest.MockedFunction<typeof svgManipulation.processElement>;
const mockCreateSvgGradientDef = gradientFactory.createSvgGradientDef as jest.MockedFunction<typeof gradientFactory.createSvgGradientDef>;

describe("gradientProcessor utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default mocks
    mockGenerateGradientId.mockReturnValue("test-gradient-id");
    mockCreateSvgGradientDef.mockReturnValue(React.createElement("linearGradient", { id: "test-gradient-id" }));
  });

  describe("applyGradientToSvg", () => {
    it("should return original source if not a valid React element", () => {
      const nonElement = "not an element";
      const result = applyGradientToSvg(nonElement, "linear");
      
      expect(result).toBe(nonElement);
      expect(mockGenerateGradientId).not.toHaveBeenCalled();
    });

    it("should process direct SVG elements", () => {
      const originalSvg = React.createElement("svg", {}, 
        React.createElement("path", { fill: "#FF0000" })
      );
      const processedSvg = React.createElement("svg", {}, 
        React.createElement("path", { fill: "url(#test-gradient-id)" })
      );
      const finalSvg = React.createElement("svg", {},
        React.createElement("defs", {}, React.createElement("linearGradient")),
        React.createElement("path", { fill: "url(#test-gradient-id)" })
      );

      mockProcessElement.mockReturnValue(processedSvg);
      mockInjectGradientDefs.mockReturnValue(finalSvg);

      const result = applyGradientToSvg(originalSvg, "linear");

      expect(mockGenerateGradientId).toHaveBeenCalledTimes(1);
      expect(mockCreateSvgGradientDef).toHaveBeenCalledWith("test-gradient-id", "linear");
      expect(mockProcessElement).toHaveBeenCalledWith(originalSvg, "test-gradient-id");
      expect(mockInjectGradientDefs).toHaveBeenCalledWith(processedSvg, expect.any(Object));
      expect(result).toBe(finalSvg);
    });

    it("should use default gradient type when not specified", () => {
      const svgElement = React.createElement("svg", {});
      mockProcessElement.mockReturnValue(svgElement);
      mockInjectGradientDefs.mockReturnValue(svgElement);

      applyGradientToSvg(svgElement);

      expect(mockCreateSvgGradientDef).toHaveBeenCalledWith("test-gradient-id", "linear");
    });

    it("should handle React component SVG sources successfully", () => {
      const mockIconComponent = jest.fn().mockReturnValue(
        React.createElement("svg", {}, React.createElement("path", { fill: "#FF0000" }))
      );
      const componentSvg = React.createElement(mockIconComponent, { color: "red" });

      const processedSvg = React.createElement("svg", {}, 
        React.createElement("path", { fill: "url(#test-gradient-id)" })
      );
      const finalSvg = React.createElement("svg", {},
        React.createElement("defs", {}, React.createElement("linearGradient")),
        React.createElement("path", { fill: "url(#test-gradient-id)" })
      );

      mockProcessElement.mockReturnValue(processedSvg);
      mockInjectGradientDefs.mockReturnValue(finalSvg);

      const result = applyGradientToSvg(componentSvg, "linear");

      expect(mockIconComponent).toHaveBeenCalledWith({ color: "red" });
      expect(mockProcessElement).toHaveBeenCalledWith(
        expect.objectContaining({ type: "svg" }), 
        "test-gradient-id"
      );
      expect(mockInjectGradientDefs).toHaveBeenCalledWith(processedSvg, expect.any(Object));
      expect(result).toBe(finalSvg);
    });

    it("should return original component if rendered SVG is not a valid React element", () => {
      const mockIconComponent = jest.fn().mockReturnValue("invalid svg");
      const componentSvg = React.createElement(mockIconComponent, { color: "red" });

      const result = applyGradientToSvg(componentSvg, "linear");

      expect(mockIconComponent).toHaveBeenCalledWith({ color: "red" });
      expect(result).toBe(componentSvg);
      expect(mockProcessElement).not.toHaveBeenCalled();
      expect(mockInjectGradientDefs).not.toHaveBeenCalled();
    });

    it("should handle component rendering errors gracefully", () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
      const mockIconComponent = jest.fn().mockImplementation(() => {
        throw new Error("Component rendering failed");
      });
      const componentSvg = React.createElement(mockIconComponent, { color: "red" });

      const result = applyGradientToSvg(componentSvg, "linear");

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Failed to render SVG component for gradient application:",
        expect.any(Error)
      );
      expect(result).toBe(componentSvg);
      expect(mockProcessElement).not.toHaveBeenCalled();
      expect(mockInjectGradientDefs).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it("should generate unique gradient IDs for each call", () => {
      const svgElement = React.createElement("svg", {});
      mockProcessElement.mockReturnValue(svgElement);
      mockInjectGradientDefs.mockReturnValue(svgElement);

      mockGenerateGradientId
        .mockReturnValueOnce("gradient-id-1")
        .mockReturnValueOnce("gradient-id-2");

      applyGradientToSvg(svgElement, "linear");
      expect(mockCreateSvgGradientDef).toHaveBeenCalledWith("gradient-id-1", "linear");

      applyGradientToSvg(svgElement, "linear");
      expect(mockCreateSvgGradientDef).toHaveBeenCalledWith("gradient-id-2", "linear");
    });

    it("should pass correct gradient type to createSvgGradientDef", () => {
      const svgElement = React.createElement("svg", {});
      mockProcessElement.mockReturnValue(svgElement);
      mockInjectGradientDefs.mockReturnValue(svgElement);

      applyGradientToSvg(svgElement, "linear");

      expect(mockCreateSvgGradientDef).toHaveBeenCalledWith("test-gradient-id", "linear");
    });

    it("should process nested component structures", () => {
      const NestedComponent = () => React.createElement("path", { fill: "#FF0000" });
      const MockIconComponent = () => React.createElement("svg", {}, React.createElement(NestedComponent));
      
      const componentSvg = React.createElement(MockIconComponent, {});
      const processedSvg = React.createElement("svg", {}, 
        React.createElement("path", { fill: "url(#test-gradient-id)" })
      );
      const finalSvg = React.createElement("svg", {},
        React.createElement("defs", {}, React.createElement("linearGradient")),
        React.createElement("path", { fill: "url(#test-gradient-id)" })
      );

      mockProcessElement.mockReturnValue(processedSvg);
      mockInjectGradientDefs.mockReturnValue(finalSvg);

      const result = applyGradientToSvg(componentSvg, "linear");

      expect(result).toBe(finalSvg);
    });

    it("should handle null and undefined svgSource gracefully", () => {
      expect(applyGradientToSvg(null, "linear")).toBe(null);
      expect(applyGradientToSvg(undefined, "linear")).toBe(undefined);
    });

    it("should handle array children correctly", () => {
      const svgElement = React.createElement("svg", {}, [
        React.createElement("path", { key: "1", fill: "#FF0000" }),
        React.createElement("circle", { key: "2", fill: "#00FF00" })
      ]);

      mockProcessElement.mockReturnValue(svgElement);
      mockInjectGradientDefs.mockReturnValue(svgElement);

      applyGradientToSvg(svgElement, "linear");

      expect(mockProcessElement).toHaveBeenCalledWith(svgElement, "test-gradient-id");
    });
  });
}); 
