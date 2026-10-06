import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { useFloatingRoot } from "./useFloatingRoot";

const RootProbe = ({
  id,
  enabled,
  name
}: {
  id: string;
  enabled: boolean;
  name: string;
}) => {
  const root = useFloatingRoot(id, enabled);
  return <span data-testid={`probe-${name}`} data-root={root?.id ?? ""} />;
};

describe("GIVEN useFloatingRoot", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("WHEN used without a ThemeProvider", () => {
    it("THEN returns a wrapper that is a direct child of the body", () => {
      render(<RootProbe id="probe-floating" name="plain" enabled />);

      const wrapper = document.getElementById("probe-floating");
      expect(wrapper?.parentElement).toBe(document.body);
      expect(screen.getByTestId("probe-plain").dataset.root).toEqual(
        "probe-floating"
      );
    });
  });

  describe("WHEN used inside a ThemeProvider mounted in the same commit", () => {
    it("THEN returns a wrapper that is a direct child of that provider", () => {
      render(
        <ThemeProvider theme="base" data-testid="provider-base">
          <RootProbe id="probe-floating" name="base" enabled />
        </ThemeProvider>
      );

      const provider = screen.getByTestId("provider-base");
      const wrappers = Array.from(provider.children).filter(
        (child) => child.id === "probe-floating"
      );
      expect(wrappers).toHaveLength(1);
      expect(screen.getByTestId("probe-base").dataset.root).toEqual(
        "probe-floating"
      );
    });
  });

  describe("WHEN several providers and the body use the same id", () => {
    it("THEN each base gets and reuses its own wrapper", () => {
      render(
        <>
          <ThemeProvider theme="base" data-testid="provider-base">
            <RootProbe id="probe-floating" name="base-one" enabled />
            <RootProbe id="probe-floating" name="base-two" enabled />
          </ThemeProvider>
          <ThemeProvider theme="next-dark" data-testid="provider-dark">
            <RootProbe id="probe-floating" name="dark" enabled />
          </ThemeProvider>
          <RootProbe id="probe-floating" name="plain" enabled />
        </>
      );

      const bases = [
        screen.getByTestId("provider-base"),
        screen.getByTestId("provider-dark"),
        document.body
      ];
      bases.forEach((base) => {
        const wrappers = Array.from(base.children).filter(
          (child) => child.id === "probe-floating"
        );
        expect(wrappers).toHaveLength(1);
      });
    });
  });

  describe("WHEN it is not enabled", () => {
    it("THEN returns null and creates no wrapper", () => {
      render(<RootProbe id="probe-floating" name="off" enabled={false} />);

      expect(document.getElementById("probe-floating")).toBeNull();
      expect(screen.getByTestId("probe-off").dataset.root).toEqual("");
    });
  });

  describe("WHEN the id changes after mount", () => {
    it("THEN returns a wrapper with the new id in the same base", () => {
      const { rerender } = render(
        <ThemeProvider theme="base" data-testid="provider-base">
          <RootProbe id="probe-first" name="base" enabled />
        </ThemeProvider>
      );
      rerender(
        <ThemeProvider theme="base" data-testid="provider-base">
          <RootProbe id="probe-second" name="base" enabled />
        </ThemeProvider>
      );

      expect(document.getElementById("probe-second")?.parentElement).toBe(
        screen.getByTestId("provider-base")
      );
      expect(screen.getByTestId("probe-base").dataset.root).toEqual(
        "probe-second"
      );
    });
  });
});
