import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Collapsible } from "../../Collapsible";
import { CollapsibleBody } from "./CollapsibleBody";
import { CollapsibleBodyProps } from "./collapsibleBody.types";

const makeSut = (props: CollapsibleBodyProps) => {
  render(
    <Collapsible open>
      <Collapsible.Item>
        <button data-testid="click" type="button">
          Click
        </button>
      </Collapsible.Item>
      <CollapsibleBody {...props} data-testid="collapsible-body-element" />
    </Collapsible>
  );
};

describe("GIVEN <Collapsible.Body />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", async () => {
      makeSut({ children: "My content" });
      await fireEvent.click(screen.getByTestId("click"));
      expect(screen.getByText("My content")).toBeDefined();
    });
  });
});
