import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { usePortalHost } from "./usePortalHost";

const HOST_ID = "test-portal-host";

const ResolvedHost: React.FC<{ host: HTMLElement; name: string }> = ({
  host,
  name,
}) => {
  React.useEffect(() => {
    host.setAttribute(`data-seen-by-${name}`, "true");
  }, [host, name]);
  return null;
};

type ConsumerProps = {
  name: string;
  enabled: boolean;
  id: string;
};

/** Reports the resolved host through the DOM so tests can assert its ancestry. */
const Consumer: React.FC<ConsumerProps> = ({ name, enabled, id }) => {
  const host = usePortalHost({ id, enabled });
  return (
    <span data-testid={`resolved-${name}`} data-resolved={host !== null}>
      {host && <ResolvedHost host={host} name={name} />}
    </span>
  );
};

const hostsIn = (
  container: Document | HTMLElement,
  id = HOST_ID
): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(`#${id}`));

const providerElement = (name: string): HTMLElement =>
  screen.getByTestId(`provider-${name}`);

const removeBodyHosts = (): void => {
  document.querySelectorAll("body > [id]").forEach((host) => host.remove());
};

describe("GIVEN usePortalHost", () => {
  beforeEach(removeBodyHosts);

  describe("WHEN there is no provider", () => {
    it("THEN should resolve a direct child of the body carrying the id", () => {
      render(<Consumer name="a" enabled id={HOST_ID} />);
      const [host] = hostsIn(document);
      expect(host.parentElement).toBe(document.body);
      expect(screen.getByTestId("resolved-a").dataset.resolved).toBe("true");
    });

    it("THEN should reuse the same host for every consumer", () => {
      render(
        <>
          <Consumer name="a" enabled id={HOST_ID} />
          <Consumer name="b" enabled id={HOST_ID} />
        </>
      );
      expect(hostsIn(document)).toHaveLength(1);
    });
  });

  describe("WHEN inside a provider", () => {
    it("THEN should resolve a direct child of the provider element", () => {
      render(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled id={HOST_ID} />
        </ThemeProvider>
      );
      const [host] = hostsIn(document);
      expect(host.parentElement).toBe(providerElement("p"));
    });

    it("THEN should share one host between two consumers of the same provider", () => {
      render(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled id={HOST_ID} />
          <Consumer name="b" enabled id={HOST_ID} />
        </ThemeProvider>
      );
      expect(hostsIn(providerElement("p"))).toHaveLength(1);
    });

    it("THEN should never choose a host with the same id inside a nested provider", () => {
      render(
        <ThemeProvider data-testid="provider-p">
          <ThemeProvider theme="dark" data-testid="provider-q">
            <Consumer name="q" enabled id={HOST_ID} />
          </ThemeProvider>
          <Consumer name="p" enabled id={HOST_ID} />
        </ThemeProvider>
      );
      expect(hostsIn(providerElement("q"))).toHaveLength(1);
      expect(hostsIn(providerElement("p"))).toHaveLength(2);
      expect(
        providerElement("q").querySelector(`#${HOST_ID}`)?.parentElement
      ).toBe(providerElement("q"));
    });

    it("THEN should never choose a host with the same id inside a sibling provider", () => {
      render(
        <>
          <ThemeProvider theme="dark" data-testid="provider-q">
            <Consumer name="q" enabled id={HOST_ID} />
          </ThemeProvider>
          <ThemeProvider data-testid="provider-p">
            <Consumer name="p" enabled id={HOST_ID} />
          </ThemeProvider>
        </>
      );
      const hostP = providerElement("p").querySelector(`#${HOST_ID}`);
      expect(hostP?.parentElement).toBe(providerElement("p"));
      expect(hostsIn(providerElement("q"))).toHaveLength(1);
    });

    it("THEN should resolve when the provider mounts in the same commit as the consumer", () => {
      render(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled id={HOST_ID} />
        </ThemeProvider>
      );
      expect(screen.getByTestId("resolved-a").dataset.resolved).toBe("true");
    });

    it("THEN should yield a single host under React.StrictMode", () => {
      render(
        <React.StrictMode>
          <ThemeProvider data-testid="provider-p">
            <Consumer name="a" enabled id={HOST_ID} />
          </ThemeProvider>
        </React.StrictMode>
      );
      expect(hostsIn(providerElement("p"))).toHaveLength(1);
    });
  });

  describe("WHEN the consumer is not enabled", () => {
    it("THEN should neither resolve nor create a host", () => {
      render(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled={false} id={HOST_ID} />
        </ThemeProvider>
      );
      expect(hostsIn(document)).toHaveLength(0);
      expect(screen.getByTestId("resolved-a").dataset.resolved).toBe("false");
    });

    it("THEN should resolve once it becomes enabled and keep the host when disabled again", () => {
      const { rerender } = render(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled={false} id={HOST_ID} />
        </ThemeProvider>
      );
      rerender(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled id={HOST_ID} />
        </ThemeProvider>
      );
      expect(screen.getByTestId("resolved-a").dataset.resolved).toBe("true");
      rerender(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled={false} id={HOST_ID} />
        </ThemeProvider>
      );
      expect(screen.getByTestId("resolved-a").dataset.resolved).toBe("true");
      expect(hostsIn(providerElement("p"))).toHaveLength(1);
    });
  });

  describe("WHEN the container already has a caller-owned child with the id", () => {
    it("THEN should reuse it unchanged and keep it after the consumer unmounts", () => {
      const owned = document.createElement("div");
      owned.id = HOST_ID;
      owned.setAttribute("data-owned", "true");
      document.body.appendChild(owned);

      const { unmount } = render(<Consumer name="a" enabled id={HOST_ID} />);
      expect(hostsIn(document)).toEqual([owned]);
      expect(owned.getAttribute("data-owned")).toBe("true");
      expect(owned.id).toBe(HOST_ID);

      unmount();
      expect(document.body.contains(owned)).toBe(true);
    });
  });

  describe("WHEN one of two consumers unmounts", () => {
    it("THEN should leave the shared host for the other consumer", () => {
      const App: React.FC<{ showA: boolean }> = ({ showA }) => (
        <ThemeProvider data-testid="provider-p">
          {showA && <Consumer name="a" enabled id={HOST_ID} />}
          <Consumer name="b" enabled id={HOST_ID} />
        </ThemeProvider>
      );
      const { rerender } = render(<App showA />);
      const [host] = hostsIn(providerElement("p"));

      rerender(<App showA={false} />);
      expect(hostsIn(providerElement("p"))).toEqual([host]);
      expect(screen.getByTestId("resolved-b").dataset.resolved).toBe("true");
    });
  });

  describe("WHEN the id changes", () => {
    it("THEN should resolve the host of the new id", () => {
      const { rerender } = render(
        <ThemeProvider data-testid="provider-p">
          <Consumer name="a" enabled id="first-host" />
        </ThemeProvider>
      );
      act(() => {
        rerender(
          <ThemeProvider data-testid="provider-p">
            <Consumer name="a" enabled id="second-host" />
          </ThemeProvider>
        );
      });
      expect(hostsIn(providerElement("p"), "first-host")).toHaveLength(1);
      expect(
        hostsIn(providerElement("p"), "second-host")[0].dataset.seenByA
      ).toBe("true");
    });
  });
});
