import type {
  StorybookIndex,
  StorybookIndexEntry,
} from "./storybook-preview-links";
import {
  COMMENT_MARKER,
  buildCommentBody,
  previewUrl,
  resolveStoryTargets,
} from "./storybook-preview-links";

const BASE_URL = "https://preview.example.com/components/pull/42/index.html";

const index: StorybookIndex = {
  entries: {
    "atomic-input--docs": {
      id: "atomic-input--docs",
      title: "Atomic/Input",
      importPath: "./packages/react/src/atomic/Input/src/input.stories.tsx",
      type: "docs",
    },
    "atomic-input--basic": {
      id: "atomic-input--basic",
      title: "Atomic/Input",
      importPath: "./packages/react/src/atomic/Input/src/input.stories.tsx",
      type: "story",
    },
    "atomic-input-input-password--docs": {
      id: "atomic-input-input-password--docs",
      title: "Atomic/Input/Input.Password",
      importPath:
        "./packages/react/src/atomic/Input/src/components/InputPassword/inputPassword.stories.tsx",
      type: "docs",
    },
    "atomic-progressbar--basic": {
      id: "atomic-progressbar--basic",
      title: "Atomic/ProgressBar",
      importPath:
        "./packages/react/src/atomic/ProgressBar/src/progressBar.stories.tsx",
      type: "story",
    },
    "composite-timepicker--docs": {
      id: "composite-timepicker--docs",
      title: "Composite/TimePicker",
      importPath:
        "./packages/react/src/composite/TimePicker/src/timePicker.stories.tsx",
      type: "docs",
    },
  },
};

describe("resolveStoryTargets", () => {
  it("links the docs page of the component that owns the changed file", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      index
    );

    expect(targets).toEqual([
      {
        title: "Atomic/Input",
        docsId: "atomic-input--docs",
        storyId: "atomic-input--basic",
      },
    ]);
  });

  it("prefers the closest stories file when a sub-component changes", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/atomic/Input/src/components/InputPassword/inputPassword.tsx",
      ],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual([
      "Atomic/Input/Input.Password",
    ]);
  });

  it("falls back to the entry point for files outside any stories directory", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/package.json"],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("resolves a stories file that changed on its own", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/atomic/Input/src/components/InputPassword/inputPassword.stories.tsx",
      ],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual([
      "Atomic/Input/Input.Password",
    ]);
  });

  it("reports each touched component once", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/atomic/Input/src/input.tsx",
        "packages/react/src/atomic/Input/src/input.types.ts",
        "packages/react/src/atomic/Input/CHANGELOG.md",
      ],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("maps a style definition back to the component it styles", () => {
    const targets = resolveStoryTargets(
      ["packages/core/styles/src/packages/atomic/input/nimbus-input.css.ts"],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("matches kebab-cased style directories against their component", () => {
    const targets = resolveStoryTargets(
      [
        "packages/core/styles/src/packages/composite/time-picker/nimbus-time-picker.css.ts",
      ],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual(["Composite/TimePicker"]);
  });

  it("skips style changes that belong to no single component", () => {
    const targets = resolveStoryTargets(
      ["packages/core/styles/src/properties/typography.ts"],
      index
    );

    expect(targets).toEqual([]);
  });

  it("skips files that belong to no component", () => {
    const targets = resolveStoryTargets(
      ["packages/icons/src/assets/double-tag.svg", ".github/workflows/ci.yml"],
      index
    );

    expect(targets).toEqual([]);
  });

  it("skips generated documentation files", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.docs.json"],
      index
    );

    expect(targets).toEqual([]);
  });

  it("ignores malformed index entries instead of throwing", () => {
    // A truncated index.json can carry entries without an importPath.
    const broken = {
      id: "broken",
      title: "Broken",
      type: "docs",
    } as unknown as StorybookIndexEntry;

    const malformed: StorybookIndex = {
      entries: { broken, ...index.entries },
    };

    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      malformed
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("skips components whose stories are absent from the index", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Badge/src/badge.tsx"],
      index
    );

    expect(targets).toEqual([]);
  });
});

describe("previewUrl", () => {
  it("points at the docs page when the component has one", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      index
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/docs/atomic-input--docs`
    );
  });

  it("points at the first story when the component has no docs page", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/atomic/ProgressBar/src/progressBar.tsx"],
      index
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/story/atomic-progressbar--basic`
    );
  });
});

describe("buildCommentBody", () => {
  it("lists a link per touched component", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/atomic/Input/src/input.tsx",
        "packages/react/src/atomic/Input/src/components/InputPassword/inputPassword.tsx",
      ],
      index
    );

    const body = buildCommentBody(BASE_URL, targets);

    expect(body).toContain(
      `- 🔗 [Atomic/Input](${BASE_URL}?path=/docs/atomic-input--docs)`
    );
    expect(body).toContain(
      `- 🔗 [Atomic/Input/Input.Password](${BASE_URL}?path=/docs/atomic-input-input-password--docs)`
    );
  });

  it("always keeps a link to the preview root", () => {
    const body = buildCommentBody(BASE_URL, []);

    expect(body).toContain(`🔗 [View Storybook](${BASE_URL})`);
  });

  it("carries the marker the workflow uses to update its own comment", () => {
    const body = buildCommentBody(BASE_URL, []);

    expect(body.startsWith(COMMENT_MARKER)).toBe(true);
  });

  it("summarises the tail when too many components changed", () => {
    const targets = Array.from({ length: 11 }, (_, position) => ({
      title: `Atomic/Component${position}`,
      docsId: `atomic-component${position}--docs`,
      storyId: null,
    }));

    const body = buildCommentBody(BASE_URL, targets);

    expect(body).toContain("- …and 3 more");
  });
});
