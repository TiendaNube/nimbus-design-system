import path from "path";

import type { Collision } from "./check-native-attr-collisions";
import {
  analyzeFiles,
  collectSourceFiles,
  createProgram,
  readNativeAttributeTypeNames,
} from "./check-native-attr-collisions";
import { knownCollisions } from "./native-attr-collisions.baseline";

const FIXTURE = path.join(
  __dirname,
  "__fixtures__/native-attr-collisions.fixture.ts"
);

const keysReportedFor = (collisions: Collision[], declaration: string) =>
  collisions
    .filter((collision) => collision.declaration === declaration)
    .map((collision) => collision.key);

describe("GIVEN check-native-attr-collisions", () => {
  describe("WHEN the native attribute type names are read from @types/react", () => {
    it("THEN should include the types React really declares", () => {
      const names = readNativeAttributeTypeNames(createProgram([FIXTURE]));

      expect(names.has("HTMLAttributes")).toBe(true);
      expect(names.has("InputHTMLAttributes")).toBe(true);
      expect(names.has("SVGAttributes")).toBe(true);
    });

    it("THEN should exclude repo-local names that only look like React types", () => {
      const names = readNativeAttributeTypeNames(createProgram([FIXTURE]));

      expect(names.has("OmittedHTMLAttributes")).toBe(false);
      expect(names.has("LocalHTMLAttributes")).toBe(false);
    });
  });

  describe("WHEN a colliding key has the same type on both sides", () => {
    it("THEN should report nothing", () => {
      const collisions = analyzeFiles([FIXTURE]);

      expect(keysReportedFor(collisions, "IdenticalProps")).toEqual([]);
    });
  });

  describe("WHEN a colliding key is narrowed but still usable", () => {
    it("THEN should report nothing", () => {
      const collisions = analyzeFiles([FIXTURE]);

      expect(keysReportedFor(collisions, "NarrowedProps")).toEqual([]);
    });
  });

  describe("WHEN a colliding key conflicts with the native attribute", () => {
    it("THEN should report that key", () => {
      const collisions = analyzeFiles([FIXTURE]);

      expect(keysReportedFor(collisions, "ConflictingProps")).toEqual([
        "color",
      ]);
    });

    it("THEN should show the declared type, the native type and what consumers get", () => {
      const [collision] = analyzeFiles([FIXTURE]).filter(
        ({ declaration }) => declaration === "ConflictingProps"
      );

      expect(collision.ownType).toBe("ResponsiveColor | undefined");
      expect(collision.nativeType).toBe("string | undefined");
      expect(collision.effectiveType).toBe(
        "(ResponsiveColor & string) | undefined"
      );
      expect(collision.unusableTypes).toEqual(["ResponsiveColor"]);
    });

    it("THEN should point at the declaration's own line", () => {
      const [collision] = analyzeFiles([FIXTURE]).filter(
        ({ declaration }) => declaration === "ConflictingProps"
      );

      expect(collision.file).toBe(
        ".scripts/__fixtures__/native-attr-collisions.fixture.ts"
      );
      expect(collision.line).toBeGreaterThan(0);
    });
  });

  describe("WHEN two handler props collide the same way and only one conflicts", () => {
    it("THEN should report only the conflicting one", () => {
      const collisions = analyzeFiles([FIXTURE]);

      expect(keysReportedFor(collisions, "HandlerProps")).toEqual(["onError"]);
    });
  });

  describe("WHEN the colliding key is omitted from the native side", () => {
    it("THEN should report nothing", () => {
      const collisions = analyzeFiles([FIXTURE]);

      expect(keysReportedFor(collisions, "GuardedProps")).toEqual([]);
    });
  });

  describe("WHEN the intersected type is a repo-local look-alike, not a React type", () => {
    it("THEN should report nothing", () => {
      const collisions = analyzeFiles([FIXTURE]);

      expect(keysReportedFor(collisions, "LocalLookAlikeProps")).toEqual([]);
    });
  });

  describe("WHEN the baseline is compared against the component sources", () => {
    it("THEN should list every known collision and no others", () => {
      const collisions = analyzeFiles(
        collectSourceFiles(path.join(__dirname, "../packages/react/src"))
      );

      expect(
        collisions
          .map(({ file, declaration, key }) => `${file} ${declaration}.${key}`)
          .sort()
      ).toEqual(
        knownCollisions
          .map(({ file, declaration, key }) => `${file} ${declaration}.${key}`)
          .sort()
      );
    });
  });
});
