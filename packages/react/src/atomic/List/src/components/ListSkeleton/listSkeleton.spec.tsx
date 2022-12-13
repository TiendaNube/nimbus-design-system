import React from "react";
import { render, screen } from "@testing-library/react";

import { ListSkeleton } from "./ListSkeleton";

const content = "myText";

describe("GIVEN <List.Skeleton />", () => {
  it("WHEN rendered THEN it should correctly render children elements", () => {
    render(<ListSkeleton>{content}</ListSkeleton>);
    expect(screen.getByText(content)).toBeTruthy();
  });
});
