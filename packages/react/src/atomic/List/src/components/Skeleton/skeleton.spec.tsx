import React from "react";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./Skeleton";

const content = "myText";

describe("GIVEN <List.Skeleton />", () => {
  it("WHEN rendered THEN it should correctly render children elements", () => {
    render(<Skeleton>{content}</Skeleton>);
    expect(screen.getByText(content)).toBeTruthy();
  });
});
