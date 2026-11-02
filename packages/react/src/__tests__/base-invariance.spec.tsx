/* eslint import/no-relative-packages: "off" */
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, vars as utilVars, themeVars } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Badge } from "@nimbus-ds/badge";
import { Input } from "@nimbus-ds/input";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Tag } from "@nimbus-ds/tag";
import { Alert } from "@nimbus-ds/alert";
import { Card } from "@nimbus-ds/card";
import {
  ThemeNimbusProvider,
  resolveNimbusTheme,
} from "../../../../.storybook/theme";

const collectLeafPaths = (
  obj: Record<string, unknown>,
  prefix = ""
): string[] => {
  const paths: string[] = [];
  Object.entries(obj).forEach(([key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") {
      paths.push(
        ...collectLeafPaths(value as Record<string, unknown>, currentPath)
      );
    } else {
      paths.push(currentPath);
    }
  });
  return paths.sort();
};

const renderRepresentativeTree = (themeName: "base" | "dark") =>
  render(
    <ThemeProvider theme={themeName}>
      <Box padding="4" backgroundColor="neutral-background">
        <Title as="h2">Orders</Title>
        <Text color="neutral-textLow">Manage your store orders</Text>
        <Badge appearance="primary" count={5} />
        <Tag appearance="success">Active</Tag>
        <Input id="search-orders" name="search" placeholder="Search orders" />
        <Button appearance="primary" size="medium">
          Create order
        </Button>
        <Alert appearance="warning" title="Pending payment">
          Verify payment status
        </Alert>
        <Card>
          <Card.Header title="Summary" />
          <Card.Body>Order details</Card.Body>
        </Card>
      </Box>
    </ThemeProvider>
  );

describe("Base & Dark Theme Invariance Suite", () => {
  it("preserves all semantic CSS variable contract leaf paths in vars", () => {
    const utilLeafPaths = collectLeafPaths(
      utilVars as unknown as Record<string, unknown>
    );
    expect(utilLeafPaths).toEqual([
      "borderRadius",
      "height",
      "marginLeft",
      "marginRight",
      "width"
    ]);

    const leafPaths = collectLeafPaths(
      themeVars as unknown as Record<string, unknown>
    );
    expect(leafPaths.length).toBeGreaterThanOrEqual(90);
    expect(leafPaths).toEqual(
      expect.arrayContaining([
        "colors.primary.interactive",
        "colors.primary.surface",
        "colors.neutral.background",
        "colors.neutral.surface",
        "colors.neutral.textHigh",
        "colors.danger.interactive",
        "colors.success.interactive",
        "colors.warning.interactive",
        "fontFamily.sans",
        "fontSize.body.base",
        "shape.border.radius.base",
        "spacing.2",
        "spacing.4"
      ])
    );
  });

  it("renders core atomic & composite components with invariant DOM structure under theme=base", () => {
    const { container } = renderRepresentativeTree("base");

    const themeRoot = container.firstElementChild as HTMLElement;
    expect(themeRoot).toBeTruthy();
    expect(themeRoot.getAttribute("class")).toBe("");

    const heading = container.querySelector("h2");
    expect(heading?.textContent).toBe("Orders");

    const button = container.querySelector("button");
    expect(button?.textContent).toContain("Create order");
    expect(button?.hasAttribute("disabled")).toBe(false);

    const input = container.querySelector(
      "input#search-orders"
    ) as HTMLInputElement | null;
    expect(input?.getAttribute("placeholder")).toBe("Search orders");
  });

  it("renders core atomic & composite components with invariant DOM structure under theme=dark", () => {
    const { container } = renderRepresentativeTree("dark");

    const themeRoot = container.firstElementChild as HTMLElement;
    expect(themeRoot).toBeTruthy();
    expect(themeRoot.getAttribute("class")).toContain("dark");

    const heading = container.querySelector("h2");
    expect(heading?.textContent).toBe("Orders");

    const button = container.querySelector("button");
    expect(button?.textContent).toContain("Create order");
    expect(button?.hasAttribute("disabled")).toBe(false);

    const input = container.querySelector(
      "input#search-orders"
    ) as HTMLInputElement | null;
    expect(input?.getAttribute("placeholder")).toBe("Search orders");
  });

  it("renders Storybook ThemeNimbusProvider across all single and side-by-side themes without runtime errors", () => {
    expect(
      resolveNimbusTheme(
        "auto",
        { fileName: "packages/react/src/atomic/Badge/src/badge.stories.tsx" },
        false
      )
    ).toBe("base");
    expect(
      resolveNimbusTheme(
        "auto",
        { fileName: "packages/react/src/next/Badge/src/badge.stories.tsx" },
        false
      )
    ).toBe("next");

    const singleModes = ["auto", "base", "dark", "next", "next-dark"] as const;
    singleModes.forEach((mode) => {
      const { container, unmount } = render(
        <ThemeNimbusProvider
          selectedTheme={mode}
          storyParameters={{
            fileName: "packages/react/src/atomic/Badge/src/badge.stories.tsx",
          }}
        >
          <Badge appearance="neutral" count="5" />
        </ThemeNimbusProvider>
      );
      expect(container.textContent).toContain("5");
      unmount();
    });

    const sideBySideModes = ["side-by-side", "side-by-side-dark"] as const;
    sideBySideModes.forEach((mode) => {
      const { container, unmount } = render(
        <ThemeNimbusProvider selectedTheme={mode}>
          <Badge appearance="neutral" count="5" />
        </ThemeNimbusProvider>
      );
      const panels = container.querySelectorAll("[data-nimbus-theme]");
      expect(panels.length).toBe(3);
      unmount();
    });
  });
});
