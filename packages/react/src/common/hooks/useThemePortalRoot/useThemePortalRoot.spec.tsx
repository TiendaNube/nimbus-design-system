import React, { StrictMode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { useThemePortalRoot } from "./useThemePortalRoot";

const HOST_ID = "nimbus-test-floating";

type Probe = { host: HTMLElement | null };

interface ConsumerProps {
  probe: Probe;
  id: string;
  enabled: boolean;
}

const Consumer: React.FC<ConsumerProps> = ({ probe, id, enabled }) => {
  const host = useThemePortalRoot(id, enabled);
  // eslint-disable-next-line no-param-reassign
  probe.host = host;
  return <span data-testid={`consumer-${id}`} />;
};

const hostsWithId = (id: string = HOST_ID): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(`[id="${id}"]`));

describe("GIVEN useThemePortalRoot", () => {
  describe("WHEN it is disabled", () => {
    it("THEN should return null and create no element", () => {
      const probe: Probe = { host: null };
      render(
        <ThemeProvider data-testid="provider">
          <Consumer probe={probe} id={HOST_ID} enabled={false} />
        </ThemeProvider>
      );
      expect(probe.host).toBeNull();
      expect(hostsWithId()).toHaveLength(0);
    });
  });

  describe("WHEN it is enabled inside a theme provider", () => {
    it("THEN should return a host that is a direct child of that provider", () => {
      const probe: Probe = { host: null };
      const { getByTestId } = render(
        <ThemeProvider data-testid="provider">
          <Consumer probe={probe} id={HOST_ID} enabled />
        </ThemeProvider>
      );
      expect(probe.host).not.toBeNull();
      expect(probe.host?.id).toBe(HOST_ID);
      expect(probe.host?.parentElement).toBe(getByTestId("provider"));
    });

    it("THEN should accept an identifier that is not a valid selector", () => {
      const probe: Probe = { host: null };
      const { getByTestId } = render(
        <ThemeProvider data-testid="provider">
          <Consumer probe={probe} id="my portal:1" enabled />
        </ThemeProvider>
      );
      expect(probe.host?.id).toBe("my portal:1");
      expect(probe.host?.parentElement).toBe(getByTestId("provider"));
    });
  });

  describe("WHEN it is enabled outside any theme provider", () => {
    it("THEN should return a host that is a direct child of document.body", () => {
      const probe: Probe = { host: null };
      render(<Consumer probe={probe} id={HOST_ID} enabled />);
      expect(probe.host?.id).toBe(HOST_ID);
      expect(probe.host?.parentElement).toBe(document.body);
    });
  });

  describe("WHEN several providers exist", () => {
    it("THEN should use the nearest provider when a nested provider mounted its host first", () => {
      const early: Probe = { host: null };
      const late: Probe = { host: null };
      const { getByTestId, rerender } = render(
        <ThemeProvider data-testid="provider-p">
          <ThemeProvider data-testid="provider-q" theme="dark">
            <Consumer probe={early} id={HOST_ID} enabled />
          </ThemeProvider>
          <div data-testid="origin-slot" />
        </ThemeProvider>
      );
      expect(early.host?.parentElement).toBe(getByTestId("provider-q"));

      rerender(
        <ThemeProvider data-testid="provider-p">
          <ThemeProvider data-testid="provider-q" theme="dark">
            <Consumer probe={early} id={HOST_ID} enabled />
          </ThemeProvider>
          <Consumer probe={late} id={HOST_ID} enabled />
        </ThemeProvider>
      );
      expect(late.host?.parentElement).toBe(getByTestId("provider-p"));
      expect(late.host).not.toBe(early.host);
    });

    it("THEN should use the sibling provider of the consumer, not an earlier one with the same id", () => {
      const early: Probe = { host: null };
      const late: Probe = { host: null };
      const { getByTestId } = render(
        <>
          <ThemeProvider data-testid="provider-q" theme="dark">
            <Consumer probe={early} id={HOST_ID} enabled />
          </ThemeProvider>
          <ThemeProvider data-testid="provider-p">
            <Consumer probe={late} id={HOST_ID} enabled />
          </ThemeProvider>
        </>
      );
      expect(early.host?.parentElement).toBe(getByTestId("provider-q"));
      expect(late.host?.parentElement).toBe(getByTestId("provider-p"));
    });

    it("THEN should ignore an element with the same id that lives outside the provider", () => {
      const stray = document.createElement("div");
      stray.id = HOST_ID;
      document.body.appendChild(stray);
      const probe: Probe = { host: null };
      const { getByTestId } = render(
        <ThemeProvider data-testid="provider-p">
          <Consumer probe={probe} id={HOST_ID} enabled />
        </ThemeProvider>
      );
      expect(probe.host).not.toBe(stray);
      expect(probe.host?.parentElement).toBe(getByTestId("provider-p"));
      stray.remove();
    });
  });

  describe("WHEN the provider and the consumer mount in the same commit", () => {
    it("THEN should resolve the host inside the provider and never in document.body", () => {
      const probe: Probe = { host: null };
      const { getByTestId } = render(
        <ThemeProvider data-testid="provider">
          <Consumer probe={probe} id={HOST_ID} enabled />
        </ThemeProvider>
      );
      expect(probe.host?.parentElement).toBe(getByTestId("provider"));
      expect(document.body.querySelector(`:scope > [id="${HOST_ID}"]`)).toBe(
        null
      );
    });
  });

  describe("WHEN several consumers share a provider", () => {
    it("THEN should share a single host and keep it after they unmount", () => {
      const a: Probe = { host: null };
      const b: Probe = { host: null };
      const { rerender, getByTestId } = render(
        <ThemeProvider data-testid="provider">
          <Consumer probe={a} id={HOST_ID} enabled />
          <Consumer probe={b} id={HOST_ID} enabled />
        </ThemeProvider>
      );
      expect(a.host).not.toBeNull();
      expect(a.host).toBe(b.host);
      expect(hostsWithId()).toHaveLength(1);

      rerender(
        <ThemeProvider data-testid="provider">
          <Consumer probe={a} id={HOST_ID} enabled />
        </ThemeProvider>
      );
      expect(hostsWithId()).toHaveLength(1);

      rerender(<ThemeProvider data-testid="provider" />);
      expect(hostsWithId()).toHaveLength(1);
      expect(hostsWithId()[0].parentElement).toBe(getByTestId("provider"));
    });
  });

  describe("WHEN the host already exists", () => {
    it("THEN should reuse a pre-existing direct child with the identifier", () => {
      const probe: Probe = { host: null };
      let existing: HTMLElement | null = null;
      const Seed: React.FC = () => {
        const ref = React.useRef<HTMLDivElement>(null);
        React.useLayoutEffect(() => {
          existing = ref.current;
        }, []);
        return <div ref={ref} id={HOST_ID} />;
      };
      render(
        <ThemeProvider data-testid="provider">
          <Seed />
          <Consumer probe={probe} id={HOST_ID} enabled />
        </ThemeProvider>
      );
      expect(probe.host).toBe(existing);
      expect(hostsWithId()).toHaveLength(1);
    });
  });

  describe("WHEN its inputs change", () => {
    it("THEN should return the host of the new identifier", () => {
      const probe: Probe = { host: null };
      const { rerender } = render(
        <ThemeProvider data-testid="provider">
          <Consumer probe={probe} id="first-id" enabled />
        </ThemeProvider>
      );
      expect(probe.host?.id).toBe("first-id");
      rerender(
        <ThemeProvider data-testid="provider">
          <Consumer probe={probe} id="second-id" enabled />
        </ThemeProvider>
      );
      expect(probe.host?.id).toBe("second-id");
    });

    it("THEN should return the same host after being disabled and enabled again", () => {
      const probe: Probe = { host: null };
      const tree = (enabled: boolean) => (
        <ThemeProvider data-testid="provider">
          <Consumer probe={probe} id={HOST_ID} enabled={enabled} />
        </ThemeProvider>
      );
      const { rerender } = render(tree(true));
      const first = probe.host;
      expect(first).not.toBeNull();
      rerender(tree(false));
      expect(probe.host).toBeNull();
      rerender(tree(true));
      expect(probe.host).toBe(first);
      expect(hostsWithId()).toHaveLength(1);
    });
  });

  describe("WHEN rendered in StrictMode", () => {
    it("THEN should leave exactly one host", () => {
      const probe: Probe = { host: null };
      render(
        <StrictMode>
          <ThemeProvider data-testid="provider">
            <Consumer probe={probe} id={HOST_ID} enabled />
          </ThemeProvider>
        </StrictMode>
      );
      expect(probe.host).not.toBeNull();
      expect(hostsWithId()).toHaveLength(1);
    });
  });

  beforeEach(() => {
    // Hosts created by earlier tests live in document.body; start clean.
    document.body.innerHTML = "";
  });
});
