import childProcess from "child_process";
import { PackageBuilder } from "@nimbus-ds/scripts/src/packageBuilder";
import fs from "fs";
import os from "os";
import path from "path";
import {
  buildReleasePackages,
  parsePlan,
  preflightRegistry,
  stableRelease,
  verifyArchive,
  type Release,
  type Run
} from "./stable";

const release: Release = {
  ident: "@nimbus-ds/example",
  cwd: "/unused",
  oldVersion: "1.0.0",
  newVersion: "1.1.0"
};
const absent = () => {
  throw Object.assign(new Error("npm failed"), {
    stdout: JSON.stringify({ error: { code: "E404" } })
  });
};

it("rejects a published target", () => {
  expect(() => preflightRegistry(release, () => '"1.1.0"')).toThrow(
    "Release drift"
  );
});
it("accepts only a structured E404 as absence", () => {
  expect(() => preflightRegistry(release, absent)).not.toThrow();
});
it.each(["E401", "E403", "E500", "ECONNRESET", "ENOTFOUND"])(
  "stops on registry %s",
  (code) => {
    const run = () => {
      throw Object.assign(new Error("npm failed"), {
        stdout: JSON.stringify({ error: { code } })
      });
    };
    expect(() => preflightRegistry(release, run)).toThrow(
      "Registry lookup failed"
    );
  }
);
it.each(["not json", "{}", '"other-version"'])(
  "rejects an invalid registry response %s",
  (output) => {
    expect(() => preflightRegistry(release, () => output)).toThrow();
  }
);
it("does not infer absence from an unstructured 404 message", () => {
  expect(() =>
    preflightRegistry(release, () => {
      throw new Error("404");
    })
  ).toThrow();
});
const manifest = {
  name: release.ident,
  version: "1.0.0",
  main: "dist/index.js",
  types: "dist/index.d.ts",
  exports: {
    ".": { import: "./dist/index.js", require: "./dist/index.cjs" },
    "./*": ["./dist/*.js", "./dist/*.cjs"]
  }
};
const entries = [
  "package/dist/index.js",
  "package/dist/index.cjs",
  "package/dist/index.d.ts"
];
it("checks conditional alternatives and patterns in the real archive inventory", () => {
  expect(() =>
    verifyArchive(manifest, entries, release.ident, "1.0.0")
  ).not.toThrow();
});
it.each(entries)("rejects missing packed artifact %s", (missing) => {
  expect(() =>
    verifyArchive(
      manifest,
      entries.filter((entry) => entry !== missing),
      release.ident,
      "1.0.0"
    )
  ).toThrow("Missing packed");
});
it.each([
  { ...manifest, version: "wrong" },
  { ...manifest, main: 5 },
  { ...manifest, exports: { ".": false } }
])("rejects a malformed packed manifest", (invalid) => {
  expect(() =>
    verifyArchive(invalid, entries, release.ident, "1.0.0")
  ).toThrow();
});
it("checks inferred declarations when no types field is declared", () => {
  expect(() =>
    verifyArchive(
      { name: release.ident, version: "1.0.0", main: "dist/index.js" },
      ["package/dist/index.js"],
      release.ident,
      "1.0.0"
    )
  ).toThrow("declarations");
});

const aggregateManifest = {
  name: "@nimbus-ds/components",
  version: "5.64.0",
  main: "dist/index.js",
  exports: {
    ".": "./dist/index.js",
    "./Pagination": "./dist/Pagination/index.js"
  }
};
const aggregateEntries = [
  "package/dist/index.js",
  "package/dist/index.d.ts",
  "package/dist/Pagination/index.js"
];

it("rejects aggregate subpath JavaScript without its component declarations", () => {
  expect(() =>
    verifyArchive(
      aggregateManifest,
      aggregateEntries,
      aggregateManifest.name,
      aggregateManifest.version
    )
  ).toThrow("dist/Pagination/index.d.ts");
});

it("accepts aggregate subpaths with their component declarations", () => {
  expect(() =>
    verifyArchive(
      aggregateManifest,
      [...aggregateEntries, "package/dist/Pagination/index.d.ts"],
      aggregateManifest.name,
      aggregateManifest.version
    )
  ).not.toThrow();
});

it("checks every component matched by an aggregate export pattern", () => {
  expect(() =>
    verifyArchive(
      {
        ...aggregateManifest,
        exports: { ".": "./dist/index.js", "./*": "./dist/*/index.js" }
      },
      [
        ...aggregateEntries,
        "package/dist/Pagination/index.d.ts",
        "package/dist/Badge/index.js"
      ],
      aggregateManifest.name,
      aggregateManifest.version
    )
  ).toThrow("dist/Badge/index.d.ts");
});

it("allows separate module JavaScript to share explicitly declared root types", () => {
  expect(() =>
    verifyArchive(
      {
        name: release.ident,
        version: "1.0.0",
        main: "dist/index.js",
        module: "dist/index.esm.js",
        types: "dist/index.d.ts"
      },
      [...entries, "package/dist/index.esm.js"],
      release.ident,
      "1.0.0"
    )
  ).not.toThrow();
});

it("rejects malformed and conflicting Yarn plans", () => {
  expect(() => parsePlan("{}")).toThrow("Invalid");
  expect(() =>
    parsePlan(
      [release, { ...release, newVersion: "1.2.0" }]
        .map((item) => JSON.stringify(item))
        .join("\n")
    )
  ).toThrow("Conflicting");
});
it("makes an empty plan a no-op without building, packing or publishing", () => {
  const run = jest.fn(() => "");
  const build = jest.fn();
  const pack = jest.fn();
  expect(stableRelease({}, { run, build, pack })).toBe(false);
  expect(run).toHaveBeenCalledTimes(1);
  expect(build).not.toHaveBeenCalled();
  expect(pack).not.toHaveBeenCalled();
});

describe("release orchestration", () => {
  let temporary: string;
  let plan: Release[];
  let calls: string[];
  let run: Run;
  beforeEach(() => {
    temporary = fs.mkdtempSync(path.join(os.tmpdir(), "stable-test-"));
    plan = ["first", "second"].map((name) => {
      const cwd = path.join(temporary, name);
      fs.mkdirSync(cwd);
      const item = { ...release, cwd, ident: `@nimbus-ds/${name}` };
      fs.writeFileSync(
        path.join(cwd, "package.json"),
        JSON.stringify({ name: item.ident, version: item.oldVersion })
      );
      return item;
    });
    calls = [];
    run = (command, args) => {
      calls.push([command, ...args].join(" "));
      if (args[0] === "config") return '"https://registry.npmjs.org"';
      if (args.includes("--dry-run"))
        return plan.map((item) => JSON.stringify(item)).join("\n");
      if (command === "npm") return absent();
      return "";
    };
  });
  afterEach(() => fs.rmSync(temporary, { recursive: true, force: true }));
  it("keeps nimbus-helper in its separate release pipeline", () => {
    plan[1].ident = "nimbus-helper";
    fs.writeFileSync(
      path.join(plan[1].cwd, "package.json"),
      JSON.stringify({ name: plan[1].ident, version: plan[1].oldVersion })
    );
    const pack = jest.fn();
    stableRelease({}, { run, build: jest.fn(), pack });
    expect(calls.filter((call) => call.includes("npm publish"))).toEqual([
      "yarn workspace @nimbus-ds/first npm publish --access public"
    ]);
    expect(pack).toHaveBeenCalledWith([plan[0]], true, run);
  });
  it("preflights every planned package before building and again before publishing", () => {
    stableRelease(
      {},
      {
        run,
        build: () => {
          calls.push("build");
        },
        pack: () => {
          calls.push("pack");
        }
      }
    );
    const publish = calls.findIndex((call) => call.includes("npm publish"));
    expect(
      calls.slice(0, publish).filter((call) => call.startsWith("npm view"))
    ).toHaveLength(4);
    expect(calls.indexOf("build")).toBe(4);
    expect(calls.filter((call) => call.includes("npm publish"))).toHaveLength(
      2
    );
  });
  it("a collision in the last package prevents version application and all publication", () => {
    const checked: Run = (command, args) =>
      command === "npm" && args[1].includes("second")
        ? '"1.1.0"'
        : run(command, args);
    expect(() =>
      stableRelease({}, { run: checked, build: jest.fn(), pack: jest.fn() })
    ).toThrow("Release drift");
    expect(calls).toHaveLength(3);
  });
  it("an incomplete archive prevents version application and publication", () => {
    expect(() =>
      stableRelease(
        {},
        {
          run,
          build: jest.fn(),
          pack: () => {
            throw new Error("Missing packed artifact");
          }
        }
      )
    ).toThrow("Missing packed");
    expect(
      calls.some(
        (call) =>
          call === "yarn version apply --all" || call.includes("npm publish")
      )
    ).toBe(false);
  });
  it.each(["dependencies", "peerDependencies", "optionalDependencies"])(
    "publishes planned %s before dependents even when the input order is reversed",
    (dependencyField) => {
      fs.writeFileSync(
        path.join(plan[0].cwd, "package.json"),
        JSON.stringify({
          name: plan[0].ident,
          version: plan[0].oldVersion,
          [dependencyField]: {
            [plan[1].ident]: "workspace:^",
            "@nimbus-ds/outside-plan": "^1.0.0"
          }
        })
      );
      stableRelease({}, { run, build: jest.fn(), pack: jest.fn() });
      expect(calls.filter((call) => call.includes("npm publish"))).toEqual([
        "yarn workspace @nimbus-ds/second npm publish --access public",
        "yarn workspace @nimbus-ds/first npm publish --access public"
      ]);
    }
  );
  it("rejects a planned dependency cycle before building, applying versions or publishing", () => {
    plan.forEach((item, index) => {
      fs.writeFileSync(
        path.join(item.cwd, "package.json"),
        JSON.stringify({
          name: item.ident,
          version: item.oldVersion,
          dependencies: { [plan[1 - index].ident]: "workspace:^" }
        })
      );
    });
    const build = jest.fn();
    const pack = jest.fn();
    expect(() => stableRelease({}, { run, build, pack })).toThrow(
      "Release dependency cycle: @nimbus-ds/first -> @nimbus-ds/second -> @nimbus-ds/first"
    );
    expect(build).not.toHaveBeenCalled();
    expect(pack).not.toHaveBeenCalled();
    expect(calls).toEqual(["yarn version apply --all --dry-run --json"]);
  });
  it("validation-only checks packs without builds or version application", () => {
    const build = jest.fn();
    const pack = jest.fn();
    stableRelease({ validateOnly: true }, { run, build, pack });
    expect(build).not.toHaveBeenCalled();
    expect(pack).toHaveBeenCalledWith(plan, false, run);
    expect(calls).toHaveLength(4);
  });
  it("check mode builds and verifies without consuming deferred files", () => {
    stableRelease({ check: true }, { run, build: jest.fn(), pack: jest.fn() });
    expect(calls).toHaveLength(5);
    expect(
      calls.some(
        (call) =>
          call === "yarn version apply --all" || call.includes("npm publish")
      )
    ).toBe(false);
  });
});

it("builds component prerequisites before the aggregate on a clean release", () => {
  const order: string[] = [];
  const build = jest
    .spyOn(PackageBuilder.prototype, "build")
    .mockImplementation((names) => {
      expect(names).toContain("@nimbus-ds/pagination");
      expect(names).toContain("@nimbus-ds/input");
      expect(names).not.toContain("@nimbus-ds/components");
      order.push("prerequisites");
    });
  const execute = jest
    .spyOn(childProcess, "execFileSync")
    .mockImplementation(() => {
      order.push("aggregate");
      return "";
    });
  try {
    buildReleasePackages(["@nimbus-ds/components", "@nimbus-ds/styles"]);
    expect(order).toEqual(["prerequisites", "aggregate"]);
    expect(build).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith(
      "yarn",
      ["workspace", "@nimbus-ds/components", "build"],
      { stdio: "inherit" }
    );
  } finally {
    build.mockRestore();
    execute.mockRestore();
  }
});
