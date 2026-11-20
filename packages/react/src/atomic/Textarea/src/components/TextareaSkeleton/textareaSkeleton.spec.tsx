import React from "react";
import { render } from "@testing-library/react";
import { Skeleton, type SkeletonProps } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";

import { TextareaSkeleton } from "./TextareaSkeleton";

jest.mock("@nimbus-ds/skeleton", () => ({
  Skeleton: jest.fn(() => null),
}));

const skeletonMock = jest.mocked(Skeleton);
const textareaSkeleton = themeVars.components.textarea.skeleton;

const lastSkeletonProps = (): SkeletonProps | undefined =>
  skeletonMock.mock.calls.at(-1)?.[0];

describe("GIVEN <Textarea.Skeleton />", () => {
  beforeEach(() => {
    skeletonMock.mockClear();
  });

  describe("WHEN rendered", () => {
    it("THEN should pass the theme size and the default width", () => {
      render(<TextareaSkeleton data-testid="skeleton-element" />);
      expect(lastSkeletonProps()).toEqual(
        expect.objectContaining({
          width: "15rem",
          height: textareaSkeleton.height,
          borderRadius: textareaSkeleton.borderRadius,
          "data-testid": "skeleton-element",
        })
      );
    });

    it("THEN should pass a custom width", () => {
      render(<TextareaSkeleton width="10rem" />);
      expect(lastSkeletonProps()).toEqual(
        expect.objectContaining({ width: "10rem" })
      );
    });
  });

  describe("WHEN the installed styles have no components.textarea", () => {
    it("THEN should fall back to the previous size", () => {
      jest.isolateModules(() => {
        jest.doMock("@nimbus-ds/styles", () => ({ themeVars: {} }));
        const { TextareaSkeleton: IsolatedTextareaSkeleton } =
          jest.requireActual<{ TextareaSkeleton: typeof TextareaSkeleton }>(
            "./TextareaSkeleton"
          );
        // The isolated registry has its own mocked Skeleton.
        const isolatedSkeleton = jest.mocked(
          jest.requireMock<{ Skeleton: typeof Skeleton }>("@nimbus-ds/skeleton")
            .Skeleton
        );
        render(<IsolatedTextareaSkeleton />);
        expect(isolatedSkeleton.mock.calls.at(-1)?.[0]).toEqual(
          expect.objectContaining({
            height: "3.375rem",
            borderRadius: "0.5rem",
          })
        );
      });
    });
  });
});
