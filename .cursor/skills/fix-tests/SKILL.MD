---
name: fix-tests
description: Run tests for a specific module and fix failing tests to match current code implementation. Use when tests are outdated after code changes, when test commands fail, or when the user wants to update tests to reflect new behavior.
---

# Fix Tests

Fix failing tests by adapting them to the current code implementation.

## When to Use

- Tests are failing after code was modified
- User asks to fix, update, or sync tests with current implementation
- User runs tests and encounters failures
- Code was iterated and tests need to match new behavior

## Determine Target Module

1. **If user specifies a module**: Use the provided module name (component, hook, util, folder path, or file name)
2. **If user has an open `.spec` or `.test` file**: Extract the module name from the open spec/test file path
3. **If neither**: Ask the user which module to test

## Instructions

### Step 1: Identify the Module

Check if the user provided a MODULE_NAME. If not, check open files for any `.spec.tsx` or `.spec.ts` or `.test.tsx` or `.test.ts` file. Use the module name from the spec/test file path.

If no module can be determined, ask:
> Which module should I run tests for? (e.g., `TimePicker`, `Button`, `useToggle`, or a path like `src/composite/TimePicker`)

### Step 2: Run Tests

Execute the test command:

```bash
yarn test MODULE_NAME
```

Wait for the command to complete and capture all output.

### Step 3: Analyze Failures

For each failing test:
1. Read the spec file containing the failing test
2. Read the source file being tested to understand current implementation
3. Identify why the test fails (changed props, renamed functions, modified behavior, updated output)

### Step 4: Fix Tests

Apply fixes following these principles:

**DO:**
- Adapt test expectations to match current code behavior
- Update mock data, props, and assertions to reflect implementation changes
- Keep tests focused on behavior and user interactions
- Consolidate similar tests into fewer high-impact tests
- Use clear, self-explanatory test descriptions

**DO NOT:**
- Modify the source code implementation
- Add comments explaining obvious code
- Create redundant tests for similar scenarios
- Test implementation details or internal state
- Add unnecessary complexity

### Step 5: Verify Fixes

Run `yarn test MODULE_NAME` again to confirm all tests pass. If failures persist, repeat steps 3-5.

## Test Quality Guidelines

- **Test behavior, not existence**: Verify what the code does, not what it is
- **One concern per test**: Each test should verify a single behavior or edge case
- **Arrange-Act-Assert**: Structure tests clearly without labeling comments
- **Prioritize critical paths**: Focus on user flows and essential functionality
- **Fewer tests, higher impact**: Prefer comprehensive tests over many shallow ones
