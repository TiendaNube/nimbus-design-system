import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const shadowLight = tokens.shadow.light.level as Record<
  string,
  { value: string; comment?: string }
>;

const LEVELS = ["0", "1", "2", "3", "4", "5"] as const;

const USED_IN: Record<string, string> = {
  "0": "Backgrounds, flat surfaces",
  "1": "Interactive elements (buttons, inputs)",
  "2": "Cards",
  "3": "Popovers, dropdowns",
  "4": "Modals, dialogs",
  "5": "Side modals, drawers",
};

interface ShadowEntry {
  level: string;
  cssVar: string;
  value: string;
  description: string;
  usedIn: string;
}

const shadowEntries: ShadowEntry[] = LEVELS.map((level) => ({
  level,
  cssVar: `var(--nimbus-shadow-level-${level})`,
  value: shadowLight[level]?.value ?? "none",
  description: shadowLight[level]?.comment ?? "",
  usedIn: USED_IN[level] ?? "—",
}));

const styles = {
  page: {
    fontFamily:
      'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: 960,
    margin: "0 auto",
    padding: 24,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
    marginTop: 40,
    color: "var(--nimbus-colors-neutral-textHigh)",
  } as React.CSSProperties,
  sectionDesc: {
    fontSize: 14,
    color: "var(--nimbus-colors-neutral-textLow)",
    marginBottom: 24,
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: 13,
  } as React.CSSProperties,
  th: {
    textAlign: "left" as const,
    padding: "8px 12px",
    borderBottom: "2px solid var(--nimbus-colors-neutral-surfaceHighlight)",
    color: "var(--nimbus-colors-neutral-textLow)",
    fontWeight: 600,
    fontSize: 12,
  } as React.CSSProperties,
  td: {
    padding: "12px",
    borderBottom: "1px solid var(--nimbus-colors-neutral-surfaceHighlight)",
    color: "var(--nimbus-colors-neutral-textHigh)",
    verticalAlign: "middle" as const,
  } as React.CSSProperties,
  tokenName: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "var(--nimbus-colors-neutral-textLow)",
    display: "block" as const,
    marginTop: 2,
  } as React.CSSProperties,
};

const ShadowPreview: React.FC<{ cssVar: string }> = ({
  cssVar,
}) => (
  <div
    style={{
      width: 80,
      height: 48,
      borderRadius: 8,
      backgroundColor: "var(--nimbus-colors-neutral-background)",
      boxShadow: cssVar,
      border: "1px solid var(--nimbus-colors-neutral-surfaceHighlight)",
      flexShrink: 0,
    }}
  />
);

ShadowPreview.displayName = "ShadowPreview";

const ShadowSection: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Shadows</h2>
    <p style={styles.sectionDesc}>
      Six elevation levels for the light theme. Higher levels convey greater
      distance from the background surface.
    </p>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Token</th>
          <th style={styles.th}>Preview</th>
          <th style={styles.th}>Value</th>
          <th style={styles.th}>Description</th>
          <th style={styles.th}>Used in</th>
        </tr>
      </thead>
      <tbody>
        {shadowEntries.map(({ level, cssVar, value, description, usedIn }) => (
          <tr key={level}>
            <td style={styles.td}>
              <strong>level.{level}</strong>
              <span style={styles.tokenName}>{cssVar}</span>
            </td>
            <td style={{ ...styles.td, width: 112 }} aria-label={`Preview for shadow level ${level}`}>
              <ShadowPreview cssVar={cssVar} />
            </td>
            <td
              style={{
                ...styles.td,
                fontFamily: "monospace",
                fontSize: 11,
                maxWidth: 280,
                color: "var(--nimbus-colors-neutral-textLow)",
                wordBreak: "break-word" as const,
              }}
            >
              {value === "none" ? (
                <em style={{ color: "var(--nimbus-colors-neutral-textDisabled)" }}>none</em>
              ) : (
                value
              )}
            </td>
            <td
              style={{
                ...styles.td,
                color: "var(--nimbus-colors-neutral-textLow)",
              }}
            >
              {description}
            </td>
            <td
              style={{
                ...styles.td,
                color: "var(--nimbus-colors-neutral-textLow)",
                fontSize: 12,
              }}
            >
              {usedIn}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

ShadowSection.displayName = "ShadowSection";

const ShadowTokensPage: React.FC = () => (
  <div style={styles.page}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 4,
        color: "var(--nimbus-colors-neutral-textHigh)",
      }}
    >
      Shadow Tokens
    </h1>
    <p
      style={{
        fontSize: 14,
        color: "var(--nimbus-colors-neutral-textLow)",
        marginBottom: 8,
      }}
    >
      Visual reference for all Nimbus Design System elevation shadow tokens.
    </p>
    <ShadowSection />
  </div>
);

ShadowTokensPage.displayName = "ShadowTokensPage";

const meta: Meta = {
  title: "Tokens/Shadows",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => <ShadowTokensPage />,
};

export const Levels: Story = {
  name: "Levels",
  render: () => (
    <div style={styles.page}>
      <ShadowSection />
    </div>
  ),
};
