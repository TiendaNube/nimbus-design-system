import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const refColors = tokens.color.light as Record<
  string,
  Record<string, { value: string }>
>;

const semanticFamilies: Record<string, { cssPrefix: string; roles: string[] }> = {
  primary: {
    cssPrefix: "--nimbus-colors-primary",
    roles: [
      "surface",
      "surfaceDisabled",
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
      "surfaceDisabled",
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
      "surfaceDisabled",
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
      "surfaceDisabled",
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
      "surfaceDisabled",
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
    backgroundImage:
      "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
    backgroundSize: "12px 12px",
    backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
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
      <div style={styles.colorBox}>
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 7,
            backgroundColor: color,
          }}
        />
      </div>
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

const lumiInteractive = [
  "radial-gradient(172.39% 156.26% at 105.11% -15.62%, rgba(70, 41, 186, 0.90) 0%, rgba(70, 41, 186, 0.20) 56.73%)",
  "radial-gradient(84.01% 107.54% at 20.17% -22.66%, #0059D5 0%, rgba(0, 89, 213, 0.20) 100%)",
  "radial-gradient(135.71% 87.74% at 33.81% 109.38%, #D8446E 0%, rgba(216, 68, 110, 0.00) 95.37%)",
  "#E5809D",
].join(", ");

const lumiDisabled = [
  "radial-gradient(172.39% 156.26% at 105.11% -15.62%, rgba(70, 41, 186, 0.18) 0%, rgba(70, 41, 186, 0.04) 56.73%)",
  "radial-gradient(84.01% 107.54% at 20.17% -22.66%, rgba(0, 89, 213, 0.20) 0%, rgba(0, 89, 213, 0.04) 100%)",
  "radial-gradient(135.71% 87.74% at 33.81% 109.38%, rgba(216, 68, 110, 0.20) 0%, rgba(216, 68, 110, 0.00) 95.37%)",
  "rgba(229, 128, 157, 0.20)",
].join(", ");

const aiGradientItems = [
  {
    name: "aiGradient-interactive",
    gradient: lumiInteractive,
    label: "aiGradient-interactive",
  },
  {
    name: "aiGradient-disabled",
    gradient: lumiDisabled,
    label: "aiGradient-disabled",
  },
];

const AiGradientsSection: React.FC = () => (
  <div>
    <h3 style={styles.familyTitle}>aiGradient</h3>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const }}>
      {aiGradientItems.map(({ name, gradient, label }) => (
        <div key={name} style={{ display: "flex", flexDirection: "column" as const, gap: 6, width: 240 }}>
          <div
            style={{
              width: "100%",
              height: 80,
              borderRadius: 8,
              border: "1px solid var(--nimbus-colors-neutral-surfaceHighlight)",
              background: gradient,
            }}
          />
          <span style={styles.label}>{label}</span>
        </div>
      ))}
    </div>
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
    <AiGradientsSection />
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
