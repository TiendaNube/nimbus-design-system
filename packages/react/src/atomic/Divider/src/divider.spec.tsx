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

  it("THEN should apply customWidth class when width is provided", () => {
    render(<Divider width="50%" data-testid="divider" />);
    expect(screen.getByTestId("divider").getAttribute("class")).toContain(
      "customWidth"
    );
  });

  it("THEN should apply customMarginLeft class when marginLeft is provided", () => {
    render(<Divider marginLeft="16px" data-testid="divider" />);
    expect(screen.getByTestId("divider").getAttribute("class")).toContain(
      "customMarginLeft"
    );
  });

  it("THEN should apply customMarginRight class when marginRight is provided", () => {
    render(<Divider marginRight="24px" data-testid="divider" />);
    expect(screen.getByTestId("divider").getAttribute("class")).toContain(
      "customMarginRight"
    );
  });

  it("THEN should not apply custom classes when width, marginLeft and marginRight are not provided", () => {
    render(<Divider data-testid="divider" />);
    const classes = screen.getByTestId("divider").getAttribute("class");
    expect(classes).not.toContain("customWidth");
    expect(classes).not.toContain("customMarginLeft");
    expect(classes).not.toContain("customMarginRight");
  });
});
