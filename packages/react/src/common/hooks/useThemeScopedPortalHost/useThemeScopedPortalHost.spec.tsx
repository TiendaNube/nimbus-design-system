import React from "react";
import { act, render, renderHook } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { useThemeScopedPortalHost } from "./useThemeScopedPortalHost";

const HOST_ID = "nimbus-test-floating";
const OTHER_HOST_ID = "nimbus-test-other";
const PROVIDER_P = "provider-p";
const PROVIDER_Q = "provider-q";

const hosts = (id = HOST_ID) => document.querySelectorAll(`#${id}`);

const directHost = (parent: Element | null) =>
  Array.from(parent?.children ?? []).find((child) => child.id === HOST_ID);

type WrapperProps = { children: React.ReactNode };

const providerWrapper = (testId: string) => {
  const Wrapper = ({ children }: WrapperProps) => (
    <ThemeProvider theme="dark" data-testid={testId}>
      {children}
    </ThemeProvider>
  );
  return Wrapper;
};

type ProbeProps = { id: string; active: boolean; name: string };

const Probe = ({ id, active, name }: ProbeProps) => {
  const host = useThemeScopedPortalHost({ id, active });
  return <span data-testid={name} data-host={host ? "ready" : "none"} />;
};

describe("GIVEN useThemeScopedPortalHost", () => {
  beforeEach(() => {
    hosts().forEach((element) => element.remove());
    hosts(OTHER_HOST_ID).forEach((element) => element.remove());
  });

  describe("WHEN it is inactive", () => {
    it("THEN should return null and create no host", () => {
      const { result } = renderHook(
        () => useThemeScopedPortalHost({ id: HOST_ID, active: false }),
        { wrapper: providerWrapper(PROVIDER_Q) }
      );
      expect(result.current).toBeNull();
      expect(hosts()).toHaveLength(0);
    });
  });

  describe("WHEN it is active inside a provider", () => {
    it("THEN should return a host that is a direct child of its own provider", () => {
      const { result } = renderHook(
        () => useThemeScopedPortalHost({ id: HOST_ID, active: true }),
        { wrapper: providerWrapper(PROVIDER_Q) }
      );
      const provider = document.querySelector(`[data-testid="${PROVIDER_Q}"]`);
      expect(result.current?.id).toBe(HOST_ID);
      expect(result.current?.parentElement).toBe(provider);
    });

    it("THEN should not return a same-id host that lives in a nested provider", () => {
      const { container } = render(
        <ThemeProvider theme="base" data-testid={PROVIDER_P}>
          <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
            <div id={HOST_ID} data-testid="nested-host" />
          </ThemeProvider>
          <Probe id={HOST_ID} active name="probe" />
        </ThemeProvider>
      );
      const p = container.querySelector(`[data-testid="${PROVIDER_P}"]`);
      const nested = container.querySelector('[data-testid="nested-host"]');
      expect(directHost(p)).toBeDefined();
      expect(directHost(p)).not.toBe(nested);
      expect(hosts()).toHaveLength(2);
    });

    it("THEN should not return a same-id host that lives in a sibling or earlier-mounted provider", () => {
      const { container } = render(
        <>
          <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
            <div id={HOST_ID} data-testid="sibling-host" />
          </ThemeProvider>
          <ThemeProvider theme="base" data-testid={PROVIDER_P}>
            <Probe id={HOST_ID} active name="probe" />
          </ThemeProvider>
        </>
      );
      const p = container.querySelector(`[data-testid="${PROVIDER_P}"]`);
      const own = directHost(p);
      expect(own).toBeDefined();
      expect(own).not.toBe(
        container.querySelector('[data-testid="sibling-host"]')
      );
    });
  });

  describe("WHEN it is active outside any provider", () => {
    it("THEN should use a direct child of the body", () => {
      const { result } = renderHook(() =>
        useThemeScopedPortalHost({ id: HOST_ID, active: true })
      );
      expect(result.current?.parentElement).toBe(document.body);
    });
  });

  describe("WHEN several consumers share a provider", () => {
    const makeScene = (names: string[]) => (
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {names.map((name) => (
          <Probe key={name} id={HOST_ID} active name={name} />
        ))}
      </ThemeProvider>
    );

    it("THEN should share one host and keep it while another consumer remains", () => {
      const { rerender, container } = render(makeScene(["a", "b"]));
      const q = container.querySelector(`[data-testid="${PROVIDER_Q}"]`);
      expect(q?.querySelectorAll(`#${HOST_ID}`)).toHaveLength(1);

      rerender(makeScene(["b"]));
      expect(q?.querySelectorAll(`#${HOST_ID}`)).toHaveLength(1);
    });

    it("THEN should remove the owned host when the last consumer leaves", () => {
      const { rerender } = render(makeScene(["a", "b"]));
      rerender(makeScene(["b"]));
      rerender(makeScene([]));
      expect(hosts()).toHaveLength(0);
    });
  });

  describe("WHEN the consumer placed the host", () => {
    it("THEN should reuse it and never remove it", () => {
      const { rerender, container } = render(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          <Probe id={HOST_ID} active={false} name="probe" />
        </ThemeProvider>
      );
      const q = container.querySelector(
        `[data-testid="${PROVIDER_Q}"]`
      ) as HTMLElement;
      const own = document.createElement("div");
      own.id = HOST_ID;
      q.appendChild(own);

      rerender(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          <Probe id={HOST_ID} active name="probe" />
        </ThemeProvider>
      );
      expect(hosts()).toHaveLength(1);
      expect(q.contains(own)).toBe(true);

      rerender(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          <Probe id={HOST_ID} active={false} name="probe" />
        </ThemeProvider>
      );
      expect(q.contains(own)).toBe(true);
    });
  });

  describe("WHEN the owned host still has content", () => {
    it("THEN should keep the host in the document", () => {
      const { rerender, container } = render(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          <Probe id={HOST_ID} active name="probe" />
        </ThemeProvider>
      );
      const host = container.querySelector(`#${HOST_ID}`) as HTMLElement;
      host.appendChild(document.createElement("span"));

      rerender(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          <Probe id={HOST_ID} active={false} name="probe" />
        </ThemeProvider>
      );
      expect(hosts()).toHaveLength(1);
    });
  });

  describe("WHEN the id changes", () => {
    it("THEN should return null in the transitional render, then a host with the new id and remove the old one", () => {
      const seen: Array<string | null> = [];
      const IdProbe: React.FC<{ id: string }> = ({ id }) => {
        const host = useThemeScopedPortalHost({ id, active: true });
        seen.push(host ? host.id : null);
        return null;
      };
      const { rerender } = render(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          <IdProbe id={HOST_ID} />
        </ThemeProvider>
      );
      seen.length = 0;

      rerender(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          <IdProbe id={OTHER_HOST_ID} />
        </ThemeProvider>
      );

      expect(seen[0]).toBeNull();
      expect(seen[seen.length - 1]).toBe(OTHER_HOST_ID);
      expect(hosts(OTHER_HOST_ID)).toHaveLength(1);
      expect(hosts()).toHaveLength(0);
    });
  });

  describe("WHEN it is deactivated and activated again", () => {
    it("THEN should return a fresh attached host each time", () => {
      const { result, rerender } = renderHook(
        ({ active }) => useThemeScopedPortalHost({ id: HOST_ID, active }),
        { initialProps: { active: true } }
      );
      const first = result.current;
      expect(first?.isConnected).toBe(true);

      rerender({ active: false });
      expect(result.current).toBeNull();

      rerender({ active: true });
      expect(result.current?.isConnected).toBe(true);
      expect(hosts()).toHaveLength(1);
    });
  });

  describe("WHEN rendered under StrictMode", () => {
    it("THEN should leave exactly one host", () => {
      render(
        <React.StrictMode>
          <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
            <Probe id={HOST_ID} active name="probe" />
          </ThemeProvider>
        </React.StrictMode>
      );
      expect(hosts()).toHaveLength(1);
    });
  });

  it("THEN should not throw when unmounted while active", () => {
    const { unmount } = renderHook(() =>
      useThemeScopedPortalHost({ id: HOST_ID, active: true })
    );
    act(() => unmount());
    expect(hosts()).toHaveLength(0);
  });
});
