![Nimbus](https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png)

# 🤖 Coderabbit Integration Guide

Coderabbit is an AI-powered code review assistant that helps maintain code quality in the Nimbus Design System. It automatically reviews pull requests and provides instant feedback.

## What to Expect

When you create a pull request, Coderabbit will:

1. **Generate a High-Level Summary**

   - Automatically analyzes your changes
   - Provides a concise overview of the PR
   - Highlights key changes and potential concerns

2. **Create a Detailed Walkthrough**

   - Breaks down code changes file by file
   - Explains the impact of changes
   - Suggests improvements when needed

3. **Suggest Labels**

   - Automatically recommends appropriate labels
   - Helps categorize your PR (bug, enhancement, etc.)

4. **Provide Additional Comments**
   - Offers specific feedback on code quality
   - Points out potential issues
   - Suggests best practices

## Interactive Features

1. **Chat with Coderabbit**

   - Ask questions about the review
   - Get instant responses
   - Request clarification on suggestions

2. **Committable Suggestions**
   - Coderabbit can provide code changes
   - You can directly commit these suggestions
   - Great for quick fixes and improvements

## Special Commands

Use these placeholders in your PR:

- `@autotitle` in the PR title: Coderabbit will generate an appropriate title
- `@autosummary` in the PR description: Coderabbit will create a detailed summary

## Breaking Changes Pre-Check

Coderabbit automatically performs a **Breaking Changes Pre-Check** on every PR. This helps ensure that breaking changes are properly versioned and documented.

### What It Checks

1. **Props API Breaking Changes**

   - Removed or renamed component props
   - Type changes (narrowing types)
   - Optional props changed to required

2. **CSS/Token Breaking Changes**

   - Removed or renamed CSS classes, variables, or tokens
   - Removed variant options from style recipes
   - Changes to default variants

3. **Behavior Breaking Changes**

   - Changes that alter existing component behavior (not extensions)
   - Removed event handlers or ref forwarding
   - Changed render output structure

4. **Export Breaking Changes**
   - Removed exports from index.ts files
   - Renamed exports

### What To Expect

When a breaking change is detected, Coderabbit will:

- Flag it with **⚠️ POTENTIAL BREAKING CHANGE**
- Verify that `package.json` has a **MAJOR version bump** (x.0.0)
- Verify that `CHANGELOG.md` has a **"🛠 Breaking changes"** section
- Apply the `breaking-change` label to the PR

### Versioning Rules

| Change Type     | Version Bump | Example       |
| --------------- | ------------ | ------------- |
| Breaking change | MAJOR        | 1.0.0 → 2.0.0 |
| New feature     | MINOR        | 1.0.0 → 1.1.0 |
| Bug fix         | PATCH        | 1.0.0 → 1.0.1 |

## Tips

- Engage with Coderabbit's feedback through the chat
- Review and consider all suggestions
- Use the automatic features to save time
- Don't hesitate to ask questions
- **Pay attention to breaking change warnings** - they help maintain backward compatibility
