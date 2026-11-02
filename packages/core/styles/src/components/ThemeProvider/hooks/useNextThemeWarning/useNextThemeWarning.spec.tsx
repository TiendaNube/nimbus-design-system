import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "../../ThemeProvider";
import {
  useNextThemeWarning,
  resetNextThemeWarnings
} from "./useNextThemeWarning";

const ProbeComponent: React.FC<{ name: string }> = ({ name }) => {
  useNextThemeWarning(name);
  return <div data-testid="probe">{name}</div>;
};

describe("useNextThemeWarning", () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetNextThemeWarnings();
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it("warns once per component when rendered under base theme in development", () => {
    const { rerender } = render(
      <ThemeProvider theme="base">
        <ProbeComponent name="NextButton" />
      </ThemeProvider>
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain("<NextButton />");
    expect(warnSpy.mock.calls[0][0]).toContain('theme="base"');
    expect(warnSpy.mock.calls[0][0]).toContain('theme="next-norteui"');

    rerender(
      <ThemeProvider theme="base">
        <ProbeComponent name="NextButton" />
      </ThemeProvider>
    );
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("warns when rendered under premium plan next or next-dark themes", () => {
    render(
      <ThemeProvider theme="next">
        <ProbeComponent name="NextButton" />
      </ThemeProvider>
    );
    render(
      <ThemeProvider theme="next-dark">
        <ProbeComponent name="NextAlert" />
      </ThemeProvider>
    );

    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy.mock.calls[0][0]).toContain('theme="next"');
    expect(warnSpy.mock.calls[1][0]).toContain('theme="next-dark"');
  });

  it("does not warn when rendered under next-norteui or next-norteui-dark themes", () => {
    render(
      <ThemeProvider theme="next-norteui">
        <ProbeComponent name="NextButton" />
      </ThemeProvider>
    );
    render(
      <ThemeProvider theme="next-norteui-dark">
        <ProbeComponent name="NextAlert" />
      </ThemeProvider>
    );

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
