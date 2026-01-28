import React from "react";
import { render, screen } from "@testing-library/react";

import { Card } from "./Card";
import type { CardProps } from "./card.types";

const makeSut = (rest: CardProps) => {
  render(<Card {...rest} data-testid="card-element" />);
};

describe("GIVEN <Card />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({ children: <div>My content</div> });
      expect(screen.getByText("My content")).toBeDefined();
    });

    describe("THEN should correctly render the submitted padding", () => {
      it("THEN should correctly render the padding default", () => {
        makeSut({ children: "My content" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("padding_base");
      });

      it("THEN should correctly render the padding none", () => {
        makeSut({ padding: "none", children: "My content" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("padding_none");
      });

      it("THEN should correctly render the padding base", () => {
        makeSut({ padding: "base", children: "My content" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("padding_base");
      });
    });

    describe("THEN should correctly render the submitted backgroundColor", () => {
      it("THEN should correctly render the backgroundColor default", () => {
        makeSut({ children: "My content" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_neutral-background");
      });

      it("THEN should correctly render the backgroundColor primary-surface", () => {
        makeSut({ children: "My content", backgroundColor: "primary-surface" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_primary-surface");
      });

      it("THEN should correctly render the backgroundColor primary-surfaceHighlight", () => {
        makeSut({
          children: "My content",
          backgroundColor: "primary-surfaceHighlight",
        });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_primary-surfaceHighlight");
      });

      it("THEN should correctly render the backgroundColor success-surface", () => {
        makeSut({ children: "My content", backgroundColor: "success-surface" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_success-surface");
      });

      it("THEN should correctly render the backgroundColor success-surfaceHighlight", () => {
        makeSut({
          children: "My content",
          backgroundColor: "success-surfaceHighlight",
        });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_success-surfaceHighlight");
      });

      it("THEN should correctly render the backgroundColor warning-surface", () => {
        makeSut({ children: "My content", backgroundColor: "warning-surface" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_warning-surface");
      });

      it("THEN should correctly render the backgroundColor warning-surfaceHighlight", () => {
        makeSut({
          children: "My content",
          backgroundColor: "warning-surfaceHighlight",
        });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_warning-surfaceHighlight");
      });

      it("THEN should correctly render the backgroundColor danger-surface", () => {
        makeSut({ children: "My content", backgroundColor: "danger-surface" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_danger-surface");
      });

      it("THEN should correctly render the backgroundColor danger-surfaceHighlight", () => {
        makeSut({
          children: "My content",
          backgroundColor: "danger-surfaceHighlight",
        });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_danger-surfaceHighlight");
      });

      it("THEN should correctly render the backgroundColor neutral-surface", () => {
        makeSut({ children: "My content", backgroundColor: "neutral-surface" });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_neutral-surface");
      });

      it("THEN should correctly render the backgroundColor neutral-surfaceHighlight", () => {
        makeSut({
          children: "My content",
          backgroundColor: "neutral-surfaceHighlight",
        });
        expect(
          screen.getByTestId("card-element").getAttribute("class")
        ).toContain("backgroundColor_neutral-surfaceHighlight");
      });
    });
  });
});
