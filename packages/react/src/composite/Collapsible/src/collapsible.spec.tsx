import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Collapsible } from "./Collapsible";
import { CollapsibleBodyProps } from "./components/CollapsibleBody/collapsibleBody.types";

const clickMock = jest.fn();

const makeSut = (props: CollapsibleBodyProps, open = false) =>
  render(
    <Collapsible open={open}>
      <Collapsible.Item>
        <button data-testid="click" type="button" onClick={clickMock}>
          Click
        </button>
      </Collapsible.Item>
      <Collapsible.Body {...props} data-testid="collapsible-body-element" />
    </Collapsible>
  );

describe("GIVEN <Collapsible />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render content", () => {
      makeSut({ children: "My content" });
      expect(screen.queryByText("My content")).toBeDefined();
    });

    it("THEN should render content and click in button", async () => {
      makeSut({ children: "My content" });
      expect(screen.queryByText("My content")).toBeNull();
      await fireEvent.click(screen.getByTestId("click"));
      expect(clickMock).toBeCalledTimes(1);
    });

    it("THEN should render content from body", () => {
      makeSut({ children: "My content" }, true);
      expect(screen.queryByText("My content")).not.toBeNull();
    });

    it("THEN should not render content from body when collapsible is open but body is visible when closed", () => {
      makeSut({ children: "My content", visibleWhen: "closed" }, true);
      expect(screen.queryByText("My content")).toBeNull();
    });

    it("THEN should not render content from body when collapsible is closed but body is visible when open", () => {
      makeSut({ children: "My content", visibleWhen: "open" }, false);
      expect(screen.queryByText("My content")).toBeNull();
    });

    it("THEN should open body with no animation", () => {
      makeSut({ children: "My content", direction: "none" }, true);
      expect(screen.queryByText("My content")).not.toBeNull();
      expect(
        screen
          .queryByText("My content")
          ?.classList.contains("nimbus-collapsible_body__63v3i0")
      ).toBe(true);
    });

    it("THEN should open body with animation from top", () => {
      makeSut({ children: "My content", direction: "top" }, true);
      expect(screen.queryByText("My content")).not.toBeNull();
      expect(
        screen
          .queryByText("My content")
          ?.classList.contains(
            "nimbus-collapsible_bodyReversalAnimation__63v3i4"
          )
      ).toBe(true);
    });
    it("THEN should open body with animation from bottom", () => {
      makeSut({ children: "My content", direction: "bottom" }, true);
      expect(screen.queryByText("My content")).not.toBeNull();
      expect(
        screen
          .queryByText("My content")
          ?.classList.contains("nimbus-collapsible_bodyAnimation__63v3i2")
      ).toBe(true);
    });
  });
});
