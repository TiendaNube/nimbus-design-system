## Runtime warnings audit

This document traces the component-by-component audit to identify and fix runtime warnings when rendering Nimbus components. Entries are kept in directory order and updated as fixes land.

Format per component:

- Component: Name and path
- Repro: How it was rendered or which test ran
- Observed warnings: Raw console warnings/errors
- Analysis: Why it happens
- Fix: Code change summary
- Status: Open/Fixed

---

### Badge (`packages/react/src/atomic/Badge`)

- Repro: `yarn test packages/react/src/atomic/Badge/src/badge.spec.tsx`
- Observed warnings:
- Analysis:
- Fix:
- Status: Pending

### Chip (`packages/react/src/atomic/Chip`)

- Repro: `yarn test packages/react/src/atomic/Chip/src/chip.spec.tsx`
- Observed warnings:
  - Warning: React does not recognize the `wordBreak` prop on a DOM element. This appeared because `Text` forwarded unknown props to DOM.
- Analysis: `Text.tsx` spread `rest` props to the DOM element alongside `otherProps` from sprinkles. This leaked style-system-only props like `wordBreak`.
- Fix: In `packages/react/src/atomic/Text/src/Text.tsx`, removed `{...rest}` from the rendered element to ensure only `otherProps` (filtered by sprinkles) are forwarded.
- Status: Fixed

### Tabs (`packages/react/src/composite/Tabs`)

- Repro: `yarn test packages/react/src/composite/Tabs/src/tabs.spec.tsx`
- Observed warnings:
  - Warning: Unknown event handler property `onTabSelect`. It will be ignored.
- Analysis: The container `<div>` was receiving `onTabSelect`/`selected` from `rest` and passing them to the DOM.
- Fix: In `packages/react/src/composite/Tabs/src/Tabs.tsx`, destructured `onTabSelect` and `selected` out of `rest` and spread only the remaining `containerProps` into the `<div>`.
- Status: Fixed

### Tooltip (`packages/react/src/atomic/Tooltip`)

- Repro: `yarn test packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx`
- Observed warnings:
  - Warning: React does not recognize the `customProp` prop on a DOM element.
- Analysis: Tooltip forwarded all `rest` props (including unknown ones) to the floating `<div>`, causing non-DOM props to leak.
- Fix: In `packages/react/src/atomic/Tooltip/src/Tooltip.tsx`, stopped spreading `{...rest}` to the floating `<div>`; only spread `otherProps` from sprinkles, and preserved `data-testid` explicitly for tests.
- Status: Fixed

### Jest configuration (global)

- Repro: `yarn test packages/react`
- Observed issue:
  - Duplicate tests executing from `dist/**` causing multiple failures/noise.
- Analysis: Jest was picking up transpiled test outputs under `dist`.
- Fix: Added `testPathIgnorePatterns: ["/node_modules/", "/dist/"]` in `jest.config.ts`.
- Status: Fixed
