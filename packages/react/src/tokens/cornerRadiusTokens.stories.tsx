import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const radiusTokens = tokens.shape.border.radius as Record<
  string,
  { value: string; comment?: string }
>;

function remToPx(value: string): string {
  if (value.endsWith("px")) return value;
  if (value.endsWith("%")) return value;
  const numeric = parseFloat(value);
  if (Number.isNaN(numeric)) return "";
  return `${Math.round(numeric * 16)}px`;
}

const ORDERED_KEYS = ["0-5", "1", "1-5", "2", "3", "4", "5", "6", "base", "half", "full"];

const DESCRIPTIONS: Record<string, string> = {
  "0-5": "Minimal rounding. For very small or tight UI elements.",
  "1": "Small rounding. For medium or small elements with or without interactions.",
  "1-5": "Medium-small rounding (6px). Default radius for most interactive components.",
  "2": "Medium rounding. For medium or large elements with or without interactions.",
  "3": "Larger rounding. For cards, modals, and panels.",
  "4": "Large rounding. Suitable for bigger containers and surfaces.",
  "5": "Extra large rounding. For oversized or decorative elements.",
  "6": "Maximum stepped rounding. Rarely used for very large elements.",
  base: "Alias of 1-5 (6px). Kept for backwards compatibility.",
  half: "Half rounding (50%). Turns rectangular elements into ellipses.",
  full: "Full rounding (9999px). For pills, tags, and fully rounded elements.",
};

const COMPONENT_USAGE: Record<string, string> = {
  "0-5": "—",
  "1": "Checkbox, Chip, Radio, Link, Badge, Tooltip",
  "1-5": "—",
  "2": "Button, Input, Select, Card, Alert, Modal, FileUploader",
  "3": "Popover, Button (large)",
  "4": "—",
  "5": "—",
  "6": "—",
  base: "—",
  half: "Toggle thumb",
  full: "Tag, Badge (dot), Toggle track, IconButton, Slider, ProgressBar",
};

interface RadiusEntry {
  key: string;
  cssVar: string;
  value: string;
  description: string;
  usedIn: string;
}

const radiusEntries: RadiusEntry[] = ORDERED_KEYS.map((key) => ({
  key,
  cssVar: `var(--nimbus-shape-border-radius-${key})`,
  value: radiusTokens[key]?.value ?? "",
  description: DESCRIPTIONS[key] ?? "",
  usedIn: COMPONENT_USAGE[key] ?? "—",
}));

const PREVIEW_SIZE = 64;

const RadiusPreview: React.FC<{ value: string; cssVar: string }> = ({
  value,
  cssVar,
}) => {
  const isHalf = value === "50%";
  const isFull = value === "9999px";
  const width = isHalf ? PREVIEW_SIZE : PREVIEW_SIZE;
  const height = isHalf ? PREVIEW_SIZE : PREVIEW_SIZE;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: cssVar,
        backgroundColor: "var(--nimbus-colors-neutral-surfaceHighlight)",
        border: `2px solid var(--nimbus-colors-neutral-interactive)`,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title={`border-radius: ${isFull ? "9999px (pill)" : value}`}
    />
  );
};

RadiusPreview.displayName = "RadiusPreview";

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
  valueCell: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "var(--nimbus-colors-neutral-textHigh)",
  } as React.CSSProperties,
  px: {
    display: "block" as const,
    color: "var(--nimbus-colors-neutral-textLow)",
    fontSize: 11,
    marginTop: 1,
  } as React.CSSProperties,
};

const CornerRadiusSection: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Border Radius</h2>
    <p style={styles.sectionDesc}>
      Semantic corner radius tokens used across all Nimbus components. All
      values reference spacing tokens except <code>full</code> and{" "}
      <code>half</code>.
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
        {radiusEntries.map(({ key, cssVar, value, description, usedIn }) => (
          <tr key={key}>
            <td style={styles.td}>
              <strong>{key}</strong>
              <span style={styles.tokenName}>{cssVar}</span>
            </td>
            <td style={{ ...styles.td, width: 96 }}>
              <RadiusPreview value={value} cssVar={cssVar} />
            </td>
            <td style={{ ...styles.td, ...styles.valueCell }}>
              {value}
              {value !== "50%" && value !== "9999px" && (
                <span style={styles.px}>{remToPx(value)}</span>
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
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--nimbus-colors-neutral-textLow)",
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

CornerRadiusSection.displayName = "CornerRadiusSection";

const CornerRadiusTokensPage: React.FC = () => (
  <div style={styles.page}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 4,
        color: "var(--nimbus-colors-neutral-textHigh)",
      }}
    >
      Corner Radius Tokens
    </h1>
    <p
      style={{
        fontSize: 14,
        color: "var(--nimbus-colors-neutral-textLow)",
        marginBottom: 8,
      }}
    >
      Visual reference for all Nimbus Design System border radius tokens.
    </p>
    <CornerRadiusSection />
  </div>
);

CornerRadiusTokensPage.displayName = "CornerRadiusTokensPage";

const meta: Meta = {
  title: "Tokens/Corner Radius",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => <CornerRadiusTokensPage />,
};

export const BorderRadius: Story = {
  name: "Border Radius",
  render: () => (
    <div style={styles.page}>
      <CornerRadiusSection />
    </div>
  ),
};
