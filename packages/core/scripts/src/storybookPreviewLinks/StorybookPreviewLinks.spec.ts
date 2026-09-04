import type {
  PreviewLinksConfig,
  StorybookIndex,
  StorybookIndexEntry,
} from "./StorybookPreviewLinks";
import {
  COMMENT_MARKER,
  buildCommentBody,
  previewUrl,
  resolveStoryTargets,
} from "./StorybookPreviewLinks";

const BASE_URL = "https://preview.example.com/components/pull/42/index.html";

/** nimbus-design-system's own layout — the richest fixture, since it also
 * exercises the styles-package mapping that nimbus-patterns' config omits. */
const config: PreviewLinksConfig = {
  componentRootPattern: /^packages\/react\/src\/(?:atomic|composite)\/[^/]+/,
  stylesComponentPattern:
    /^packages\/core\/styles\/src\/packages\/(?:atomic|composite)\/([^/]+)/,
};

const index: StorybookIndex = {
  entries: {
    "atomic-input--docs": {
      id: "atomic-input--docs",
      title: "Atomic/Input",
      name: "Docs",
      importPath: "./packages/react/src/atomic/Input/src/input.stories.tsx",
      type: "docs",
    },
    "atomic-input--basic": {
      id: "atomic-input--basic",
      title: "Atomic/Input",
      name: "Basic",
      importPath: "./packages/react/src/atomic/Input/src/input.stories.tsx",
      type: "story",
    },
    "atomic-input-input-password--docs": {
      id: "atomic-input-input-password--docs",
      title: "Atomic/Input/Input.Password",
      name: "Docs",
      importPath:
        "./packages/react/src/atomic/Input/src/components/InputPassword/inputPassword.stories.tsx",
      type: "docs",
    },
    "atomic-progressbar--basic": {
      id: "atomic-progressbar--basic",
      title: "Atomic/ProgressBar",
      name: "Basic",
      importPath:
        "./packages/react/src/atomic/ProgressBar/src/progressBar.stories.tsx",
      type: "story",
    },
    "composite-timepicker--docs": {
      id: "composite-timepicker--docs",
      title: "Composite/TimePicker",
      name: "Docs",
      importPath:
        "./packages/react/src/composite/TimePicker/src/timePicker.stories.tsx",
      type: "docs",
    },
  },
};

const storyEntry = (
  id: string,
  name: string,
  importPath: string,
  title: string
): StorybookIndexEntry => ({ id, name, importPath, title, type: "story" });

/** Two docs-less files: one with a baseline story, one without. */
const manyStoriesIndex: StorybookIndex = {
  entries: {
    // Emitted before Default on purpose.
    "atomic-slider--custom": storyEntry(
      "atomic-slider--custom",
      "Custom",
      "./packages/react/src/atomic/Slider/src/slider.stories.tsx",
      "Atomic/Slider"
    ),
    "atomic-slider--default": storyEntry(
      "atomic-slider--default",
      "Default",
      "./packages/react/src/atomic/Slider/src/slider.stories.tsx",
      "Atomic/Slider"
    ),
    "atomic-divider--horizontal": storyEntry(
      "atomic-divider--horizontal",
      "Horizontal",
      "./packages/react/src/atomic/Divider/src/divider.stories.tsx",
      "Atomic/Divider"
    ),
    "atomic-divider--vertical": storyEntry(
      "atomic-divider--vertical",
      "Vertical",
      "./packages/react/src/atomic/Divider/src/divider.stories.tsx",
      "Atomic/Divider"
    ),
  },
};

describe("resolveStoryTargets", () => {
  it("links the docs page of the component that owns the changed file", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      index,
      config
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
      index,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual([
      "Atomic/Input/Input.Password",
    ]);
  });

  it("falls back to the entry point for files outside any stories directory", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/package.json"],
      index,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("resolves a stories file that changed on its own", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/atomic/Input/src/components/InputPassword/inputPassword.stories.tsx",
      ],
      index,
      config
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
      index,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("maps a style definition back to the component it styles", () => {
    const targets = resolveStoryTargets(
      ["packages/core/styles/src/packages/atomic/input/nimbus-input.css.ts"],
      index,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("matches kebab-cased style directories against their component", () => {
    const targets = resolveStoryTargets(
      [
        "packages/core/styles/src/packages/composite/time-picker/nimbus-time-picker.css.ts",
      ],
      index,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual(["Composite/TimePicker"]);
  });

  it("skips style changes that belong to no single component", () => {
    const targets = resolveStoryTargets(
      ["packages/core/styles/src/properties/typography.ts"],
      index,
      config
    );

    expect(targets).toEqual([]);
  });

  it("skips files that belong to no component", () => {
    const targets = resolveStoryTargets(
      ["packages/icons/src/assets/double-tag.svg", ".github/workflows/ci.yml"],
      index,
      config
    );

    expect(targets).toEqual([]);
  });

  it("skips generated documentation files", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.docs.json"],
      index,
      config
    );

    expect(targets).toEqual([]);
  });

  it("ignores malformed index entries instead of throwing", () => {
    // A truncated index.json can carry entries without an importPath.
    const broken = {
      id: "broken",
      title: "Broken",
      name: "Broken",
      type: "docs",
    } as unknown as StorybookIndexEntry;

    const malformed: StorybookIndex = {
      entries: { broken, ...index.entries },
    };

    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      malformed,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("ignores an index entry whose importPath is not a string", () => {
    const numeric = {
      id: "numeric",
      title: "Numeric",
      name: "Numeric",
      importPath: 1,
      type: "docs",
    } as unknown as StorybookIndexEntry;

    const malformed: StorybookIndex = {
      entries: { numeric, ...index.entries },
    };

    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      malformed,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("ignores an index entry whose title is not a string", () => {
    const untitled = {
      id: "untitled",
      title: 7,
      name: "Untitled",
      importPath: "./packages/react/src/atomic/Badge/src/badge.stories.tsx",
      type: "docs",
    } as unknown as StorybookIndexEntry;

    const malformed: StorybookIndex = {
      entries: { untitled, ...index.entries },
    };

    const targets = resolveStoryTargets(
      [
        "packages/react/src/atomic/Badge/src/badge.tsx",
        "packages/react/src/atomic/Input/src/input.tsx",
      ],
      malformed,
      config
    );

    expect(targets.map(({ title }) => title)).toEqual(["Atomic/Input"]);
  });

  it("skips components whose stories are absent from the index", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Badge/src/badge.tsx"],
      index,
      config
    );

    expect(targets).toEqual([]);
  });
});

describe("previewUrl", () => {
  it("points at the docs page when the component has one", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      index,
      config
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/docs/atomic-input--docs`
    );
  });

  it("points at a story when the component has no docs page", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/atomic/ProgressBar/src/progressBar.tsx"],
      index,
      config
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/story/atomic-progressbar--basic`
    );
  });

  // The real case is ProgressBar: eleven stories, no docs page. Slider stands in
  // for it with Custom emitted before Default, and Divider covers a file where
  // no story carries a baseline name at all.
  it("picks the baseline story of a docs-less component, not the index order", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/atomic/Slider/src/slider.tsx"],
      manyStoriesIndex,
      config
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/story/atomic-slider--default`
    );
  });

  it("keeps the index order when no story carries a baseline name", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/atomic/Divider/src/divider.tsx"],
      manyStoriesIndex,
      config
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/story/atomic-divider--horizontal`
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
      index,
      config
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

  it("omits the decision block when the workflow states no decision", () => {
    const body = buildCommentBody(BASE_URL, []);

    expect(body).not.toContain("<details>");
  });

  it("folds the decision away behind a summary", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched: ["packages/react/src/atomic/Input/src/input.tsx"],
    });

    expect(body).toContain(
      "<summary>Why this preview exists, and why these links</summary>"
    );
  });

  it("lists the files that triggered the build as evidence", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched: ["yarn.lock", "packages/core/styles/src/properties/index.ts"],
    });

    expect(body).toContain("- `yarn.lock`");
    expect(body).toContain("- `packages/core/styles/src/properties/index.ts`");
  });

  it("truncates the evidence when a pull request matched many files", () => {
    const matched = Array.from(
      { length: 14 },
      (_, position) =>
        `packages/react/src/atomic/Component${position}/src/a.tsx`
    );

    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched,
    });

    expect(body).toContain("- …and 4 more");
  });

  it("names the label as the reason when it forced the build", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "label",
      matched: [],
    });

    expect(body).toContain("`storybook-preview` label forces a preview");
  });

  it("says so when the build happened because the diff was unreadable", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "unavailable-diff",
      matched: [],
    });

    expect(body).toContain("could not be read");
  });

  it("explains the absence of per-component links", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched: ["yarn.lock"],
    });

    expect(body).toContain("**No link per component**");
  });

  it("explains where the per-component links come from", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/atomic/Input/src/input.tsx"],
      index,
      config
    );

    const body = buildCommentBody(BASE_URL, targets, {
      trigger: "build-inputs",
      matched: ["packages/react/src/atomic/Input/src/input.tsx"],
    });

    expect(body).toContain("**The links above**");
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
