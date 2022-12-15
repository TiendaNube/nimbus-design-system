import React from "react";
import { render, screen } from "@testing-library/react";

import { TextareaSkeleton } from "./TextareaSkeleton";

const makeSut = () => {
  render(<TextareaSkeleton data-testid="skeleton-element" />);
};

describe("GIVEN <Textarea.Skeleton />", () => {
  describe("WHEN rendered", () => {
    makeSut();
    it("THEN should render skeleton base", () => {
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 15rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 3.375rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });
  });
});
