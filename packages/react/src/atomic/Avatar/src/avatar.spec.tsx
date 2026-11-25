import React from "react";
import { render, screen } from "@testing-library/react";

import { Avatar } from "./Avatar";
import { type AvatarProps } from "./avatar.types";

const makeSut = (props: Partial<AvatarProps> = {}) => {
  render(
    <Avatar data-testid="avatar-element" {...props}>
      {props.children ?? "R"}
    </Avatar>
  );
};

describe("GIVEN <Avatar />", () => {
  describe("WHEN rendered without props", () => {
    it("THEN should show its initial", () => {
      makeSut();
      expect(screen.getByTestId("avatar-element").textContent).toBe("R");
    });

    it("THEN should use the medium size", () => {
      makeSut();
      expect(screen.getByTestId("avatar-element").className).toContain(
        "size_medium"
      );
    });

    it("THEN should use the neutral appearance", () => {
      makeSut();
      expect(screen.getByTestId("avatar-element").className).toContain(
        "appearance_neutral"
      );
    });
  });

  describe("WHEN rendered with size small", () => {
    it("THEN should use the small size", () => {
      makeSut({ size: "small" });
      expect(screen.getByTestId("avatar-element").className).toContain(
        "size_small"
      );
    });
  });

  describe("WHEN rendered with size large", () => {
    it("THEN should use the large size", () => {
      makeSut({ size: "large" });
      expect(screen.getByTestId("avatar-element").className).toContain(
        "size_large"
      );
    });
  });

  describe("WHEN rendered with appearance ai", () => {
    it("THEN should use the ai appearance", () => {
      makeSut({ appearance: "ai" });
      expect(screen.getByTestId("avatar-element").className).toContain(
        "appearance_ai"
      );
    });
  });

  describe("WHEN rendered with an icon", () => {
    it("THEN should render the icon inside the avatar", () => {
      makeSut({ children: <svg data-testid="avatar-icon" /> });
      expect(
        screen
          .getByTestId("avatar-element")
          .contains(screen.getByTestId("avatar-icon"))
      ).toBe(true);
    });
  });

  describe("WHEN rendered without an accessible name", () => {
    it("THEN should be hidden from assistive technologies", () => {
      makeSut();
      expect(
        screen.getByTestId("avatar-element").getAttribute("aria-hidden")
      ).toBe("true");
    });
  });

  describe("WHEN rendered with an accessible name", () => {
    it("THEN should be exposed as an image with that name", () => {
      makeSut({ "aria-label": "Avatar" });
      expect(screen.getByRole("img", { name: "Avatar" })).toBeDefined();
    });
  });

  describe("WHEN rendered with aria-labelledby", () => {
    it("THEN should be exposed as an image named by that element", () => {
      render(
        <>
          <span id="avatar-name">Avatar</span>
          <Avatar aria-labelledby="avatar-name">A</Avatar>
        </>
      );
      const element = screen.getByRole("img", { name: "Avatar" });
      expect(element.getAttribute("aria-hidden")).toBeNull();
    });
  });

  describe("WHEN rendered with a className", () => {
    it("THEN should keep it next to the avatar classes", () => {
      makeSut({ className: "custom-class" });
      expect(screen.getByTestId("avatar-element").className).toContain(
        "custom-class"
      );
    });
  });
});
