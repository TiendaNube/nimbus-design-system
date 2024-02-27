import React from "react";
import { render } from "@testing-library/react";

import { Collapsible } from "./Collapsible";
import { CollapsibleProperties } from "./collapsible.types";

const makeSut = (props: CollapsibleProperties) => {
  render(<Collapsible {...props} data-testid="collapsible-element" />);
};

describe("GIVEN <Box />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", async () => {
      makeSut({ children: "My content" });
    });
  });
});
