import React from "react";
import { render } from "@testing-library/react";
import { Skeleton, type SkeletonProps } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";

import { SelectSkeleton } from "./SelectSkeleton";
import { type SelectSkeletonProps } from "./selectSkeleton.types";

jest.mock("@nimbus-ds/skeleton", () => ({
  Skeleton: jest.fn(() => null),
}));

const skeletonMock = jest.mocked(Skeleton);
const selectSkeleton = themeVars.components.select.skeleton;

const makeSut = (props?: SelectSkeletonProps) => {
  render(<SelectSkeleton {...props} data-testid="skeleton-element" />);
};

const lastSkeletonProps = (): SkeletonProps | undefined =>
  skeletonMock.mock.calls.at(-1)?.[0];

describe("GIVEN <Select.Skeleton />", () => {
  beforeEach(() => {
    skeletonMock.mockClear();
  });

  describe("WHEN rendered", () => {
    it("THEN should pass the medium theme size and the default width", () => {
      makeSut();
      expect(lastSkeletonProps()).toEqual(
        expect.objectContaining({
          width: "15rem",
          height: selectSkeleton.medium.height,
          borderRadius: selectSkeleton.medium.borderRadius,
          "data-testid": "skeleton-element",
        })
      );
    });

    it("THEN should pass a custom width", () => {
      makeSut({ width: "10rem" });
      expect(lastSkeletonProps()).toEqual(
        expect.objectContaining({ width: "10rem" })
      );
    });
  });

  describe("WHEN size is set", () => {
    it.each(["medium", "small"] as const)(
      "THEN should pass the %s theme size",
      (size) => {
        makeSut({ size });
        expect(lastSkeletonProps()).toEqual(
          expect.objectContaining({
            height: selectSkeleton[size].height,
            borderRadius: selectSkeleton[size].borderRadius,
          })
        );
      }
    );
  });

  describe("WHEN the installed styles have no components.select", () => {
    it.each([
      ["medium", "2.25rem", "0.5rem"],
      ["small", "1.75rem", "0.375rem"],
    ] as const)(
      "THEN should fall back to the previous %s size",
      (size, height, borderRadius) => {
        jest.isolateModules(() => {
          jest.doMock("@nimbus-ds/styles", () => ({ themeVars: {} }));
          const { SelectSkeleton: IsolatedSelectSkeleton } =
            jest.requireActual<{ SelectSkeleton: typeof SelectSkeleton }>(
              "./SelectSkeleton"
            );
          // The isolated registry has its own mocked Skeleton.
          const isolatedSkeleton = jest.mocked(
            jest.requireMock<{ Skeleton: typeof Skeleton }>(
              "@nimbus-ds/skeleton"
            ).Skeleton
          );
          render(<IsolatedSelectSkeleton size={size} />);
          expect(isolatedSkeleton.mock.calls.at(-1)?.[0]).toEqual(
            expect.objectContaining({ height, borderRadius })
          );
        });
      }
    );
  });
});
