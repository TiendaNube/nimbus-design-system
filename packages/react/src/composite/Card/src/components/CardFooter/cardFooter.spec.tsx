import React from "react";
import { render, screen } from "@testing-library/react";

import { CardFooter } from "./CardFooter";
import { type CardFooterProps } from "./cardFooter.types";

const makeSut = (props: CardFooterProps) => {
  render(<CardFooter {...props} data-testid="footer-element" />);
};

describe("GIVEN <Card.Footer />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content" });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });
});
