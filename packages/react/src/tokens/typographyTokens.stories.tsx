import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const fontSizeTokens = tokens.font.size as Record<
  string,
  Record<string, { value: string }>
>;
const lineHeightTokens = tokens.line.height as Record<
  string,
  Record<string, { value: string }>
>;

function remToPx(rem: string): string {
  const numeric = parseFloat(rem);
  if (Number.isNaN(numeric)) return "";
  return `${Math.round(numeric * 16)}px`;
}

const fontFamilyEntries = [
  {
    name: "sans",
    cssVar: "var(--nimbus-fontFamily-sans)",
    value: tokens.font.family.sans.value as string,
    description: "Default font family for all UI components.",
  },
  {
    name: "mono",
    cssVar: "var(--nimbus-fontFamily-mono)",
    value: tokens.font.family.mono.value as string,
    description: "Monospace font family for code blocks and code elements.",
  },
];

const fontSizeGroups = [
  {
    group: "Body",
    items: [
      {
        name: "caption",
        cssVar: "var(--nimbus-fontSize-body-caption)",
        value: fontSizeTokens.body.caption.value,
        description:
          "For caption text and small components like labels, inputs or chips.",
      },
      {
        name: "base",
        cssVar: "var(--nimbus-fontSize-body-base)",
        value: fontSizeTokens.body.base.value,
        description: "For plain text and large amounts of content.",
      },
      {
        name: "highlight",
        cssVar: "var(--nimbus-fontSize-body-highlight)",
        value: fontSizeTokens.body.highlight.value,
        description:
          "For highlighted text or titles with the lowest importance.",
      },
    ],
  },
  {
    group: "Title",
    items: (["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((level) => ({
      name: level,
      cssVar: `var(--nimbus-fontSize-title-${level})`,
      value: fontSizeTokens.title[level].value,
      description: "",
    })),
  },
];

const fontWeightEntries = [
  {
    name: "regular",
    cssVar: "var(--nimbus-fontWeight-regular)",
    value: tokens.font.weight.regular.value as string,
    description:
      "Plain text with regular weight. Use with highlight, base or caption sizes.",
  },
  {
    name: "medium",
    cssVar: "var(--nimbus-fontWeight-medium)",
    value: tokens.font.weight.medium.value as string,
    description: "Plain text with medium weight. Compatible with every size.",
  },
  {
    name: "bold",
    cssVar: "var(--nimbus-fontWeight-bold)",
    value: tokens.font.weight.bold.value as string,
    description:
      "Semi-bold weight. Use with highlight, base or caption sizes.",
  },
];

const lineHeightGroups = [
  {
    group: "Body",
    items: [
      {
        name: "caption",
        cssVar: "var(--nimbus-lineWeight-body-caption)",
        value: lineHeightTokens.body.caption.value,
        pairedWith: "font-size-body-caption",
      },
      {
        name: "base",
        cssVar: "var(--nimbus-lineWeight-body-base)",
        value: lineHeightTokens.body.base.value,
        pairedWith: "font-size-body-base",
      },
      {
        name: "highlight",
        cssVar: "var(--nimbus-lineWeight-body-highlight)",
        value: lineHeightTokens.body.highlight.value,
        pairedWith: "font-size-body-highlight",
      },
    ],
  },
  {
    group: "Title",
    items: (["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((level) => ({
      name: level,
      cssVar: `var(--nimbus-lineWeight-title-${level})`,
      value: lineHeightTokens.title[level].value,
      pairedWith: `font-size-title-${level}`,
    })),
  },
];

const styles = {
  page: {
    fontFamily:
      'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: 900,
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
  groupTitle: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "var(--nimbus-colors-neutral-textLow)",
    marginBottom: 12,
    marginTop: 24,
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

const FontFamilySection: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Font Family</h2>
    <p style={styles.sectionDesc}>
      Font families used across all Nimbus components.
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
        {fontFamilyEntries.map(({ name, cssVar, value, description }) => (
          <tr key={name}>
            <td style={styles.td}>
              <strong>{name}</strong>
              <span style={styles.tokenName}>{cssVar}</span>
            </td>
            <td style={styles.td}>
              <span
                style={{
                  fontFamily: cssVar,
                  fontSize: 16,
                  color: "var(--nimbus-colors-neutral-textHigh)",
                }}
              >
                The quick brown fox jumps over the lazy dog
              </span>
            </td>
            <td style={{ ...styles.td, fontFamily: "monospace", fontSize: 11 }}>
              {value}
            </td>
            <td style={{ ...styles.td, color: "var(--nimbus-colors-neutral-textLow)" }}>
              {description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FontSizeSection: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Font Size</h2>
    <p style={styles.sectionDesc}>
      Semantic font sizes for body text and headings.
    </p>
    {fontSizeGroups.map(({ group, items }) => (
      <div key={group}>
        <p style={styles.groupTitle}>{group}</p>
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
            {items.map(({ name, cssVar, value, description }) => (
              <tr key={name}>
                <td style={styles.td}>
                  <strong>{name}</strong>
                  <span style={styles.tokenName}>{cssVar}</span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      fontSize: value,
                      fontFamily:
                        'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: "var(--nimbus-colors-neutral-textHigh)",
                      lineHeight: 1.2,
                    }}
                  >
                    Aa
                  </span>
                </td>
                <td style={{ ...styles.td, fontFamily: "monospace", fontSize: 11 }}>
                  {value}
                  <span style={{ ...styles.tokenName, marginTop: 1 }}>
                    {remToPx(value)}
                  </span>
                </td>
                <td style={{ ...styles.td, color: "var(--nimbus-colors-neutral-textLow)" }}>
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

const FontWeightSection: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Font Weight</h2>
    <p style={styles.sectionDesc}>
      Available font weights for text styling.
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
        {fontWeightEntries.map(({ name, cssVar, value, description }) => (
          <tr key={name}>
            <td style={styles.td}>
              <strong>{name}</strong>
              <span style={styles.tokenName}>{cssVar}</span>
            </td>
            <td style={styles.td}>
              <span
                style={{
                  fontWeight: value,
                  fontSize: 16,
                  fontFamily:
                    'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: "var(--nimbus-colors-neutral-textHigh)",
                }}
              >
                The quick brown fox jumps over the lazy dog
              </span>
            </td>
            <td style={{ ...styles.td, fontFamily: "monospace", fontSize: 11 }}>
              {value}
            </td>
            <td style={{ ...styles.td, color: "var(--nimbus-colors-neutral-textLow)" }}>
              {description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LineHeightSection: React.FC = () => (
  <div>
    <h2 style={styles.sectionTitle}>Line Height</h2>
    <p style={styles.sectionDesc}>
      Semantic line heights paired with their corresponding font sizes.
    </p>
    {lineHeightGroups.map(({ group, items }) => (
      <div key={group}>
        <p style={styles.groupTitle}>{group}</p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Token</th>
              <th style={styles.th}>Preview</th>
              <th style={styles.th}>Value</th>
              <th style={styles.th}>Paired with</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ name, cssVar, value, pairedWith }) => (
              <tr key={name}>
                <td style={styles.td}>
                  <strong>{name}</strong>
                  <span style={styles.tokenName}>{cssVar}</span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      lineHeight: value,
                      fontSize: 14,
                      fontFamily:
                        'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      color: "var(--nimbus-colors-neutral-textHigh)",
                      display: "block",
                      maxWidth: 260,
                      border: "1px dashed #d2d7ea",
                      padding: "0 4px",
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </span>
                </td>
                <td style={{ ...styles.td, fontFamily: "monospace", fontSize: 11 }}>
                  {value}
                  <span style={{ ...styles.tokenName, marginTop: 1 }}>
                    {remToPx(value)}
                  </span>
                </td>
                <td style={{ ...styles.td, fontFamily: "monospace", fontSize: 11, color: "var(--nimbus-colors-neutral-textLow)" }}>
                  {pairedWith}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

const TypographyTokensPage: React.FC = () => (
  <div style={styles.page}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 4,
        color: "var(--nimbus-colors-neutral-textHigh)",
      }}
    >
      Typography Tokens
    </h1>
    <p
      style={{
        fontSize: 14,
        color: "var(--nimbus-colors-neutral-textLow)",
        marginBottom: 8,
      }}
    >
      Visual reference for all Nimbus Design System typography tokens.
    </p>
    <FontFamilySection />
    <FontSizeSection />
    <FontWeightSection />
    <LineHeightSection />
  </div>
);

const meta: Meta = {
  title: "Tokens/Typography",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => <TypographyTokensPage />,
};

export const FontFamily: Story = {
  name: "Font Family",
  render: () => (
    <div style={styles.page}>
      <FontFamilySection />
    </div>
  ),
};

export const FontSizes: Story = {
  name: "Font Sizes",
  render: () => (
    <div style={styles.page}>
      <FontSizeSection />
    </div>
  ),
};

export const FontWeights: Story = {
  name: "Font Weights",
  render: () => (
    <div style={styles.page}>
      <FontWeightSection />
    </div>
  ),
};

export const LineHeights: Story = {
  name: "Line Heights",
  render: () => (
    <div style={styles.page}>
      <LineHeightSection />
    </div>
  ),
};
