# Nimbus Playground

This directory is Nimbus's execution surface for disposable prototypes. It lets a
person or agent turn an uncertain interaction into a temporary Storybook preview
before deciding whether the result belongs in Nimbus Core, Nimbus Patterns, or a
product.

The canonical process is being discussed in
[nimbus-process PR #15](https://github.com/TiendaNube/nimbus-process/pull/15).
This file defines only the mechanics of working in this repository. Implementation
is tracked in [ONB-1176](https://tiendanube.atlassian.net/browse/ONB-1176).

## Start with an intention

Before building, record in the prototype pull request:

- what someone wants to be able to do;
- who would use it and in which situation;
- the question the prototype should help answer;
- the owner or contact who can clarify and close the exploration.

For an agent-mediated request, also record the requester and a permalink to the original
request. This preserves the human source of the intention; it is not an approval.

A prototype does not need a specification, public API, classification, release
plan, or evidence that the idea should ship.

## Branch and directory

Create the prototype from current `master` on a branch named
`prototype/<slug>`. Keep all implementation files below one directory:

```text
packages/react/src/prototypes/
└── <PrototypeName>/
    ├── <PrototypeName>.tsx
    └── <prototypeName>.stories.tsx
```

Do not add a `package.json`, webpack configuration, changelog, generated docs,
release declaration, or production export. A prototype is not a workspace or a
published package.

## Required stories

Every prototype stories file must use a `Prototypes/<PrototypeName>` title and
export both:

- `Playground`: the internal working view. Use args and controls when they help
  the team explore states or variants.
- `FullScreen`: the shareable experience. Set its display name to `Full screen`,
  use Storybook's fullscreen layout, and disable controls when they would distract
  from trying the interaction.

The pull-request preview reads both story IDs from Storybook's generated
`index.json`. Missing either story produces a warning in the preview comment.
Keep the story title and both export names stable while the exploration is active;
the direct preview URL should remain the same across feedback iterations.

## Nimbus imports

Import Nimbus components from their package-level aliases:

```tsx
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Card } from "@nimbus-ds/card";
```

Do not import from `@nimbus-ds/components`. Storybook's current alias converter
derives a package filename from the aggregate path `./packages/react/src`; that
path has no package segment, so it resolves to
`packages/react/src/undefined.tsx` and the preview build fails. This is a build
constraint, not a style preference.

## What can be rough

A prototype may use local state, mock data, temporary styles, simulated
navigation, and hardcoded behavior. It does not require automated tests or the
architecture and quality gates expected from production components.

Record every mocked, hardcoded, or simulated part in the pull request so nobody
mistakes the preview for a complete product flow.

The following boundaries are mandatory:

- never import prototype code from production code;
- never add a production export or package entry;
- never use secrets, credentials, personal data, real customer data, or
  confidential information;
- use only material safe for public disclosure: preview URLs are unauthenticated and
  predictable from the pull-request number;
- never publish or merge a prototype;
- do not modify production code merely to make the prototype work.

## Run locally

Use the repository's normal Storybook commands:

```bash
yarn storybook
yarn build:storybook
```

The local `tsconfig.json` keeps editor autocomplete while deliberately relaxing
prototype-only type restrictions. Root typecheck, lint, Jest, Sonar, versioning,
and publication exclude this directory. Those controls remain unchanged for
production source.

## Pull request and preview

Open a draft pull request using
`.github/PULL_REQUEST_TEMPLATE/prototype.md`. Prototype pull requests remain
draft and are never merged.

The preview comment exposes:

- a Storybook deep link to `Playground`;
- a direct `iframe.html` link to `Full screen`.

Keep the pull request open while the temporary preview is needed. Updating the
branch updates both views.

The process owner performs a monthly manual sweep of open draft `prototype/*` pull requests.
List them with:

```bash
gh pr list --state open --draft --json number,headRefName,updatedAt --jq '.[] | select(.headRefName | startswith("prototype/"))'
```

For each inactive prototype, record an extension with its owner or close it after preserving
the outcome. This is a manual process for the initial volume.

## Record the outcome and close

Before closing the pull request, preserve:

- who tried the prototype and which task they attempted;
- observations and changes in understanding;
- mocks, hardcodes, simulations, limitations, and open questions;
- screenshots or a recording when the result must remain understandable after
  the preview disappears;
- the outcome: discard, new exploration, or formal handoff.

Closing the pull request removes the preview. Delete the branch once neither the
active exploration nor its handoff needs it. A prototype with no activity for 30
days expires unless its owner records an active extension.
