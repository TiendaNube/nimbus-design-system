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

1. Confirm the intention, participant, learning question, and owner. For an
   agent-mediated request, record the requester and permalink to the original request in
   the draft pull request as the source of the intention. If the need
   is clear enough to build, do not require a specification or introduce a
   questionnaire. If it is already understood well enough to specify, use the
   formal contribution process instead.
2. Build the smallest coherent interaction that can answer the current learning
   question. Fix only what prevents learning or violates a mandatory safety
   boundary; do not turn the prototype into production code.
3. When branch or pull-request creation is within the user's request, start from
   current `master`, create `prototype/<slug>`, and keep all code below one
   prototype directory. Open the draft pull request as soon as the first useful
   path is available so its preview can start.
4. Compose package-level Nimbus imports and create the required `Playground` and
   `FullScreen` stories. Keep their title and export names stable while the
   exploration is active so iterations reuse the same preview URL. Do not import
   `@nimbus-ds/components`; the aggregate alias breaks in the current Storybook
   configuration.
5. When the preview becomes ready, lead with the direct `FullScreen` URL using
   the user-facing label `Preview`, one short instruction for trying it, and one
   question tied to the learning goal. Do not share the general Playground or
   Storybook root. Offer the draft pull request only as a secondary link when
   someone may want to continue locally.
6. Keep conversational updates brief and in the initiator's language. After
   requested feedback, update the same branch, say only what materially changed,
   and ask at most one next question. Post lifecycle updates only in the request
   thread and only when the preview or requested iteration is ready, or when a
   failure needs attention.
7. Record mocks, hardcodes, simulations, limitations, and observations in the
   pull request. Mention them in conversation only when requested or necessary
   to interpret the prototype safely.
8. Keep the draft pull request open while participants need the temporary
   preview. Preserve observations and the explicit outcome before closing.
   Never merge the prototype. A formal handoff transfers evidence, not
   implementation.

## Mandatory boundaries

- Do not add a package, workspace, release declaration, changelog, generated
  docs, or production export.
- Do not import prototype code from production or modify production to support
  the experiment.
- Do not publish, merge, or use credentials, personal data, customer data,
  secrets, or confidential information.
- Preview URLs are public and predictable from the pull-request number; use only content
  safe for public disclosure.
- Do not infer Core or Pattern ownership from the Playground location.
- Do not close a pull request until the needed durable evidence is preserved.
