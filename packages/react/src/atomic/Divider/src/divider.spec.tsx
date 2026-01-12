import React from "react";
import { render, screen } from "@testing-library/react";

import { Divider } from "./Divider";

describe("GIVEN <Divider />", () => {
  it("THEN should render horizontal by default", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider").getAttribute("class")).toContain(
      "orientation_horizontal"
    );
  });

  it("THEN should accept vertical orientation", () => {
    render(<Divider orientation="vertical" data-testid="divider" />);
    expect(screen.getByTestId("divider").getAttribute("class")).toContain(
      "orientation_vertical"
    );
  });

  it("THEN should reflect appearance token", () => {
    render(<Divider appearance="neutral" data-testid="divider" />);
    expect(screen.getByTestId("divider").getAttribute("class")).toContain(
      "appearance_neutral"
    );
  });

  it("THEN should reflect thickness token", () => {
    render(<Divider thickness={2} data-testid="divider" />);
    expect(screen.getByTestId("divider").getAttribute("class")).toContain(
      "Thickness_2"
    );
  });
});
