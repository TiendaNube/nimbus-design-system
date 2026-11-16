import React from "react";
import { render, screen } from "@testing-library/react";

import type * as StylesModule from "@nimbus-ds/styles";
import { ButtonSkeleton } from "./ButtonSkeleton";
import type * as ButtonSkeletonModule from "./ButtonSkeleton";
import { type ButtonSkeletonProps } from "./buttonSkeleton.types";

const makeSut = (props?: ButtonSkeletonProps) => {
  render(<ButtonSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Button.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 4.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: var\(--nimbus-components-button-medium-height\);/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: var\(--nimbus-components-button-medium-radius\);/
      );
    });
  });

  describe("WHEN an older @nimbus-ds/styles has no components.button", () => {
    it("THEN should keep the previous size", () => {
      jest.isolateModules(() => {
        jest.doMock("@nimbus-ds/styles", () => {
          const actual =
            jest.requireActual<typeof StylesModule>("@nimbus-ds/styles");
          const { button: _button, ...components } =
            actual.themeVars.components;
          return {
            ...actual,
            themeVars: { ...actual.themeVars, components },
          };
        });
        /* eslint-disable @typescript-eslint/no-var-requires, global-require */
        const { ButtonSkeleton: OldStylesSkeleton } =
          require("./ButtonSkeleton") as typeof ButtonSkeletonModule;
        /* eslint-enable @typescript-eslint/no-var-requires, global-require */
        render(<OldStylesSkeleton data-testid="old-styles-skeleton" />);
      });
      const style =
        screen.getByTestId("old-styles-skeleton").getAttribute("style") ?? "";
      expect(style).toMatch(/--height__\w{0,9}: 2rem;/);
      expect(style).toMatch(/--borderRadius__\w{0,9}: 0.5rem;/);
    });
  });
});
