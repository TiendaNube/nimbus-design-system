import React from "react";
import { render, screen } from "@testing-library/react";

import { Item } from "./Item";

const content = "myText";

describe("GIVEN <Item />", () => {
  it("WHEN rendered THEN it should correctly render children elements", () => {
    render(<Item>{content}</Item>);
    expect(screen.getByText(content)).toBeTruthy();
  });
});
