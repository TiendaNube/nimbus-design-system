import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const refColors = tokens.color.light as Record<
  string,
  Record<string, { value: string }>
>;

const semanticFamilies: Record<string, { cssPrefix: string; roles: string[] }> =
  {
    primary: {
      cssPrefix: "--nimbus-colors-primary",
      roles: [
        "surface",
        "surfaceHighlight",
        "interactive",
        "interactiveHover",
        "interactivePressed",
        "textLow",
        "textHigh",
      ],
    },
    success: {
      cssPrefix: "--nimbus-colors-success",
      roles: [
        "surface",
        "surfaceHighlight",
        "interactive",
        "interactiveHover",
        "interactivePressed",
        "textLow",
        "textHigh",
      ],
    },
    warning: {
      cssPrefix: "--nimbus-colors-warning",
      roles: [
        "surface",
        "surfaceHighlight",
        "interactive",
        "interactiveHover",
        "interactivePressed",
        "textLow",
        "textHigh",
      ],
    },
    danger: {
      cssPrefix: "--nimbus-colors-danger",
      roles: [
        "surface",
        "surfaceHighlight",
        "interactive",
        "interactiveHover",
        "interactivePressed",
        "textLow",
        "textHigh",
      ],
    },
    neutral: {
      cssPrefix: "--nimbus-colors-neutral",
      roles: [
        "background",
        "surface",
        "surfaceDisabled",
        "surfaceHighlight",
        "interactive",
        "interactiveHover",
        "interactivePressed",
        "textDisabled",
        "textLow",
        "textHigh",
      ],
    },
    aiGenerative: {
      cssPrefix: "--nimbus-colors-aiGenerative",
      roles: [
        "background",
        "surface",
        "surfaceHighlight",
        "interactive",
        "interactiveHover",
        "interactivePressed",
        "textLow",
        "textHigh",
      ],
    },
    aiGradient: {
      cssPrefix: "--nimbus-colors-aiGradient",
      roles: [
        "blueHigh",
        "blueLight",
        "purpleHigh",
        "purpleLight",
        "pinkHigh",
        "pinkLight",
      ],
    },
  };

const styles = {
  page: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: 1200,
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
  familyTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
    marginTop: 24,
    textTransform: "capitalize" as const,
    color: "var(--nimbus-colors-neutral-textHigh)",
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: 12,
    marginBottom: 16,
  } as React.CSSProperties,
  swatch: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 6,
  } as React.CSSProperties,
  colorBox: {
    width: "100%",
    aspectRatio: "1",
    borderRadius: 8,
    border: "1px solid var(--nimbus-colors-neutral-surfaceHighlight)",
  } as React.CSSProperties,
  label: {
    fontSize: 11,
    fontWeight: 600,
    textAlign: "center" as const,
    color: "var(--nimbus-colors-neutral-textHigh)",
    wordBreak: "break-all" as const,
  } as React.CSSProperties,
  value: {
    fontSize: 10,
    textAlign: "center" as const,
    color: "var(--nimbus-colors-neutral-textLow)",
    fontFamily: "monospace",
  } as React.CSSProperties,
};

function ColorSwatch({
  color,
  name,
  hexValue,
}: {
  color: string;
  name: string;
  hexValue?: string; // eslint-disable-line react/require-default-props
}) {
  return (
    <div style={styles.swatch}>
      <div style={{ ...styles.colorBox, backgroundColor: color }} />
      <span style={styles.label}>{name}</span>
      {hexValue && <span style={styles.value}>{hexValue}</span>}
    </div>
  );
}

const ReferencePalette: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Reference Palette</h2>
    <p style={styles.sectionDesc}>
      Raw color values from the design token scale. These are the base hex
      values that semantic tokens reference.
    </p>
    {Object.entries(refColors).map(([family, scale]) => {
      const numericOnly = Object.entries(scale)
        .filter(([key]) => /^\d+$/.test(key))
        .sort(([a], [b]) => Number(b) - Number(a));
      return (
        <div key={family}>
          <h3 style={styles.familyTitle}>{family}</h3>
          <div style={styles.grid}>
            {numericOnly.map(([step, token]) => (
              <ColorSwatch
                key={step}
                color={token.value}
                name={`${step}`}
                hexValue={token.value}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

const SemanticTokens: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Semantic Tokens</h2>
    <p style={styles.sectionDesc}>
      Theme-aware tokens that change with light/dark mode. Toggle the theme in
      the Storybook toolbar to see them update.
    </p>
    {Object.entries(semanticFamilies).map(([family, { cssPrefix, roles }]) => (
      <div key={family}>
        <h3 style={styles.familyTitle}>{family}</h3>
        <div style={styles.grid}>
          {roles.map((role) => {
            const cssVar = `var(${cssPrefix}-${role})`;
            return (
              <ColorSwatch
                key={role}
                color={cssVar}
                name={role}
                hexValue={`${cssPrefix}-${role}`}
              />
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

const ColorTokensPage: React.FC = () => (
  <div style={styles.page}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 4,
        color: "var(--nimbus-colors-neutral-textHigh)",
      }}
    >
      Color Tokens
    </h1>
    <p
      style={{
        fontSize: 14,
        color: "var(--nimbus-colors-neutral-textLow)",
        marginBottom: 8,
      }}
    >
      Visual reference for all Nimbus Design System color tokens.
    </p>
    <SemanticTokens />
    <ReferencePalette />
  </div>
);

const meta: Meta = {
  title: "Tokens/Colors",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => <ColorTokensPage />,
};

export const ReferencePaletteStory: Story = {
  name: "Reference Palette",
  render: () => (
    <div style={styles.page}>
      <ReferencePalette />
    </div>
  ),
};

export const SemanticTokensStory: Story = {
  name: "Semantic Tokens",
  render: () => (
    <div style={styles.page}>
      <SemanticTokens />
    </div>
  ),
};
