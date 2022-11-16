import React from "react";
import { render, screen } from "@testing-library/react";

import { Footer } from "./Footer";
import { FooterProps } from "./footer.types";

const makeSut = (props: FooterProps) => {
  render(<Footer {...props} data-testid="footer-element" />);
};

describe("GIVEN <Footer />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content" });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });
});
