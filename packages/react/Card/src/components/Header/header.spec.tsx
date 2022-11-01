import React from "react";
import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import { HeaderProps } from "./header.types";

const makeSut = (props?: HeaderProps) => {
  render(<Header {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Thumbnail.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 6.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 100%;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });
  });

  describe("THEN should correctly render the submitted aspectRatio", () => {
    it("THEN should correctly render the aspectRatio none", () => {
      makeSut({ aspectRatio: "none" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_none");
    });

    it("THEN should correctly render the aspectRatio default", () => {
      makeSut();
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_1-1");
    });

    it("THEN should correctly render the aspectRatio 1-1", () => {
      makeSut({ aspectRatio: "1-1" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_1-1");
    });

    it("THEN should correctly render the aspectRatio 1-2", () => {
      makeSut({ aspectRatio: "1-2" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_1-2");
    });

    it("THEN should correctly render the aspectRatio 16-9", () => {
      makeSut({ aspectRatio: "16-9" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_16-9");
    });

    it("THEN should correctly render the aspectRatio 2-1", () => {
      makeSut({ aspectRatio: "2-1" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_2-1");
    });

    it("THEN should correctly render the aspectRatio 3-4", () => {
      makeSut({ aspectRatio: "3-4" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_3-4");
    });

    it("THEN should correctly render the aspectRatio 4-3", () => {
      makeSut({ aspectRatio: "4-3" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_4-3");
    });

    it("THEN should correctly render the aspectRatio 9-16", () => {
      makeSut({ aspectRatio: "9-16" });
      expect(
        screen
          .getByTestId("file-uploader-skeleton-container")
          .getAttribute("class")
      ).toContain("aspectRatio_9-16");
    });
  });
});
