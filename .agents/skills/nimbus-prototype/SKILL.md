---
name: nimbus-prototype
description: Create, iterate, hand off, or close a disposable Nimbus Playground prototype in Core when interaction is needed to learn before formal classification. Do not use for production components or already-specified contributions.
---

# Nimbus prototype

Use the Playground to answer an explicit learning question with a temporary
interactive example. Its location in Core does not classify the eventual
solution.

Before acting, read
[`packages/react/src/prototypes/README.md`](../../../packages/react/src/prototypes/README.md)
for repository mechanics. The proposed canonical process lives in
[nimbus-process PR #15](https://github.com/TiendaNube/nimbus-process/pull/15);
check its current status rather than treating a proposed decision as accepted.

## Workflow

1. Confirm the intention, participant, learning question, and owner. If the need
   is already understood well enough to specify, use the formal contribution
   process instead.
2. When branch or pull-request creation is within the user's request, start from
   current `master`, create `prototype/<slug>`, and keep all code below one
   prototype directory.
3. Compose package-level Nimbus imports and create the required `Playground` and
   `FullScreen` stories. Do not import `@nimbus-ds/components`; the aggregate
   alias breaks in the current Storybook configuration.
4. Build the Storybook preview and report mocks, hardcodes, simulations, and
   limitations. Fix only what prevents learning or violates a mandatory safety
   boundary; do not turn the prototype into production code.
5. Open a draft pull request with the prototype template when authorized. Keep
   it open while participants need the temporary preview.
6. Preserve observations and the explicit outcome before closing. Never merge
   the prototype. A formal handoff transfers evidence, not implementation.

## Mandatory boundaries

- Do not add a package, workspace, release declaration, changelog, generated
  docs, or production export.
- Do not import prototype code from production or modify production to support
  the experiment.
- Do not publish, merge, or use credentials, personal data, customer data,
  secrets, or confidential information.
- Do not infer Core or Pattern ownership from the Playground location.
- Do not close a pull request until the needed durable evidence is preserved.
