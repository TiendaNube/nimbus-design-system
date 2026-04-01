import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const spacingTokens = tokens.spacing as Record<
  string,
  { value: string; comment?: string }
>;

function remToPx(value: string): string {
  const numeric = parseFloat(value);
  if (Number.isNaN(numeric)) return "";
  return `${Math.round(numeric * 16)}px`;
}

const ORDERED_KEYS = [
  "0-5",
  "1",
  "1-5",
  "2",
  "2-5",
  "3",
  "3-5",
  "4",
  "4-5",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "18",
  "20",
];

interface SpacingEntry {
  key: string;
  cssVar: string;
  value: string;
  px: string;
  description: string;
}

const spacingEntries: SpacingEntry[] = ORDERED_KEYS.map((key) => ({
  key,
  cssVar: `var(--nimbus-spacing-${key})`,
  value: spacingTokens[key]?.value ?? "",
  px: remToPx(spacingTokens[key]?.value ?? ""),
  description: spacingTokens[key]?.comment ?? "—",
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
    padding: "10px 12px",
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

/**
 * Shows the spacing value as an actual-size colored square,
 * so you can see the real physical size of the token on screen.
 * Capped at 80px so the table stays readable for large values.
 */
const SpacingPreview: React.FC<{ value: string }> = ({ value }) => {
  const MAX_DISPLAY = 80;
  const px = Math.min(Math.round(parseFloat(value) * 16), MAX_DISPLAY);
  const isCapped = Math.round(parseFloat(value) * 16) > MAX_DISPLAY;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: px,
          height: px,
          backgroundColor: "var(--nimbus-colors-primary-surfaceHighlight)",
          border: "1px solid var(--nimbus-colors-primary-interactive)",
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      {isCapped && (
        <span
          style={{
            fontSize: 10,
            color: "var(--nimbus-colors-neutral-textDisabled)",
            fontFamily: "monospace",
          }}
        >
          capped at {MAX_DISPLAY}px
        </span>
      )}
    </div>
  );
};

SpacingPreview.displayName = "SpacingPreview";

const SpacingSection: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Spacing</h2>
    <p style={styles.sectionDesc}>
      Spacing scale based on a 4px unit with half-step variants. The preview
      shows each token at its actual rendered size.
    </p>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Token</th>
          <th style={styles.th}>Preview</th>
          <th style={styles.th}>Value</th>
          <th style={styles.th}>Description</th>
        </tr>
      </thead>
      <tbody>
        {spacingEntries.map(({ key, cssVar, value, px, description }) => (
          <tr key={key}>
            <td style={styles.td}>
              <strong>{key}</strong>
              <span style={styles.tokenName}>{cssVar}</span>
            </td>
            <td style={{ ...styles.td, width: 160 }} aria-label={`Preview for spacing ${key}`}>
              <SpacingPreview value={value} />
            </td>
            <td
              style={{
                ...styles.td,
                fontFamily: "monospace",
                fontSize: 12,
                whiteSpace: "nowrap" as const,
              }}
            >
              {value}
              <span
                style={{
                  display: "block",
                  color: "var(--nimbus-colors-neutral-textLow)",
                  fontSize: 11,
                  marginTop: 1,
                }}
              >
                {px}
              </span>
            </td>
            <td
              style={{
                ...styles.td,
                color: "var(--nimbus-colors-neutral-textLow)",
              }}
            >
              {description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

SpacingSection.displayName = "SpacingSection";

const SpacingTokensPage: React.FC = () => (
  <div style={styles.page}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 4,
        color: "var(--nimbus-colors-neutral-textHigh)",
      }}
    >
      Spacing Tokens
    </h1>
    <p
      style={{
        fontSize: 14,
        color: "var(--nimbus-colors-neutral-textLow)",
        marginBottom: 8,
      }}
    >
      Visual reference for all Nimbus Design System spacing tokens.
    </p>
    <SpacingSection />
  </div>
);

SpacingTokensPage.displayName = "SpacingTokensPage";

const meta: Meta = {
  title: "Tokens/Spacing",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => <SpacingTokensPage />,
};

export const Scale: Story = {
  name: "Scale",
  render: () => (
    <div style={styles.page}>
      <SpacingSection />
    </div>
  ),
};
