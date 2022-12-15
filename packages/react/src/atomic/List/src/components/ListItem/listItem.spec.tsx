import React from "react";
import { render, screen } from "@testing-library/react";

import { ListItem } from "./ListItem";

const content = "myText";

describe("GIVEN <ListItem />", () => {
  it("WHEN rendered THEN it should correctly render children elements", () => {
    render(<ListItem>{content}</ListItem>);
    expect(screen.getByText(content)).toBeTruthy();
  });
});
