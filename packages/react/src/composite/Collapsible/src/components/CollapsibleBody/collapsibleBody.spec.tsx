import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Collapsible } from "../../Collapsible";
import { CollapsibleBody } from "./CollapsibleBody";
import { type CollapsibleBodyProps } from "./collapsibleBody.types";

const clickMock = jest.fn();

const makeSut = (props: CollapsibleBodyProps, open = false) => {
  render(
    <Collapsible open={open}>
      <Collapsible.Item>
        <button data-testid="click" type="button" onClick={clickMock}>
          Click
        </button>
      </Collapsible.Item>
      <CollapsibleBody {...props} data-testid="collapsible-body-element" />
    </Collapsible>
  );
};

describe("GIVEN <Collapsible.Body />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render content", async () => {
      makeSut({ children: "My content" });
      expect(screen.queryByText("My content")).toBeDefined();
    });

    it("THEN should render content and click in button", async () => {
      makeSut({ children: "My content" });
      expect(screen.queryByText("My content")).toBeNull();
      await fireEvent.click(screen.getByTestId("click"));
      expect(clickMock).toBeCalledTimes(1);
    });

    it("THEN should render content from body", async () => {
      makeSut({ children: "My content" }, true);
      expect(screen.queryByText("My content")).not.toBeNull();
    });
  });
});
