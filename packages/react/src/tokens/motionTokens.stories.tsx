import React, { useCallback, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@nimbus-ds/icon-button";
import { StopIcon } from "@nimbus-ds/icons";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const { motion } = tokens;

/**
 * Right-pointing play triangle only (no ring). `@nimbus-ds/icons` PlayIcon includes a circle; this glyph matches common “play” affordances for demos.
 */
const PlayTriangleGlyph: React.FC = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-hidden
    focusable="false"
    fill="currentColor"
    style={{ display: "block" }}
  >
    <path d="M5.5 4.25v7.5L12.25 8 5.5 4.25z" />
  </svg>
);

PlayTriangleGlyph.displayName = "PlayTriangleGlyph";

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
  codeBlock: {
    marginTop: 12,
    padding: 12,
    fontSize: 12,
    fontFamily: "monospace",
    backgroundColor: "var(--nimbus-colors-neutral-surfaceDisabled)",
    borderRadius: 8,
    overflowX: "auto" as const,
    color: "var(--nimbus-colors-neutral-textHigh)",
  } as React.CSSProperties,
};

const DURATION_KEYS = ["1", "2", "3", "4", "5", "illustrative"] as const;

type DurationKey = (typeof DURATION_KEYS)[number];

const durationCssVar = (key: DurationKey): string =>
  key === "illustrative"
    ? "var(--nimbus-motion-duration-illustrative)"
    : `var(--nimbus-motion-duration-${key})`;

const DurationPreview: React.FC<{ cssVarDuration: string }> = ({
  cssVarDuration,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setExpanded((v) => !v);
  }, []);

  return (
    <div style={{ width: 140 }}>
      <IconButton
        type="button"
        size="1.25rem"
        source={expanded ? <StopIcon /> : <PlayTriangleGlyph />}
        onClick={handleToggle}
        aria-label={expanded ? "Reset width animation" : "Play width animation"}
      />
      <div
        style={{
          marginTop: 8,
          height: 8,
          width: expanded ? 120 : 32,
          borderRadius: 4,
          backgroundColor: "var(--nimbus-colors-primary-interactive)",
          transition: `width ${cssVarDuration} var(--nimbus-motion-easing-out-quart)`,
        }}
      />
    </div>
  );
};

DurationPreview.displayName = "DurationPreview";

const EasingPreview: React.FC<{ cssVarEasing: string }> = ({
  cssVarEasing,
}) => {
  const [shifted, setShifted] = useState(false);

  const handleToggle = useCallback(() => {
    setShifted((v) => !v);
  }, []);

  return (
    <div style={{ width: 140 }}>
      <IconButton
        type="button"
        size="1.25rem"
        source={shifted ? <StopIcon /> : <PlayTriangleGlyph />}
        onClick={handleToggle}
        aria-label={shifted ? "Reset translation" : "Play translation"}
      />
      <div
        style={{
          marginTop: 8,
          position: "relative",
          height: 24,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 4,
            width: 22,
            height: 18,
            borderRadius: 4,
            backgroundColor: "var(--nimbus-colors-primary-interactive)",
            transform: shifted ? "translateX(88px)" : "translateX(0)",
            transition: `transform var(--nimbus-motion-duration-2) ${cssVarEasing}`,
          }}
        />
      </div>
    </div>
  );
};

EasingPreview.displayName = "EasingPreview";

const EASING_ROWS: { path: string; cssVar: string }[] = [
  { path: "linear", cssVar: "var(--nimbus-motion-easing-linear)" },
  { path: "out.quad", cssVar: "var(--nimbus-motion-easing-out-quad)" },
  { path: "out.cubic", cssVar: "var(--nimbus-motion-easing-out-cubic)" },
  { path: "out.quart", cssVar: "var(--nimbus-motion-easing-out-quart)" },
  { path: "out.quint", cssVar: "var(--nimbus-motion-easing-out-quint)" },
  { path: "out.expo", cssVar: "var(--nimbus-motion-easing-out-expo)" },
  { path: "out.circ", cssVar: "var(--nimbus-motion-easing-out-circ)" },
  { path: "inOut.quad", cssVar: "var(--nimbus-motion-easing-inOut-quad)" },
  { path: "inOut.cubic", cssVar: "var(--nimbus-motion-easing-inOut-cubic)" },
  { path: "inOut.quart", cssVar: "var(--nimbus-motion-easing-inOut-quart)" },
  { path: "inOut.quint", cssVar: "var(--nimbus-motion-easing-inOut-quint)" },
  { path: "inOut.expo", cssVar: "var(--nimbus-motion-easing-inOut-expo)" },
  { path: "inOut.circ", cssVar: "var(--nimbus-motion-easing-inOut-circ)" },
  { path: "in.quad", cssVar: "var(--nimbus-motion-easing-in-quad)" },
  { path: "in.cubic", cssVar: "var(--nimbus-motion-easing-in-cubic)" },
  { path: "in.quart", cssVar: "var(--nimbus-motion-easing-in-quart)" },
];

function getEasingTokenEntry(
  path: string
): { value: string; comment?: string } | undefined {
  const parts = path.split(".");
  if (parts[0] === "linear") {
    return motion.easing.linear;
  }
  if (parts[0] === "out" && parts[1]) {
    const k = parts[1] as keyof typeof motion.easing.out;
    return motion.easing.out[k];
  }
  if (parts[0] === "inOut" && parts[1]) {
    const k = parts[1] as keyof typeof motion.easing.inOut;
    return motion.easing.inOut[k];
  }
  if (parts[0] === "in" && parts[1]) {
    const k = parts[1] as keyof typeof motion.easing.in;
    return motion.easing.in[k];
  }
  return undefined;
}

const MotionTokensPage: React.FC = () => (
  <div style={styles.page}>
    <h1
      style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 4,
        color: "var(--nimbus-colors-neutral-textHigh)",
      }}
    >
      Motion tokens
    </h1>
    <p
      style={{
        fontSize: 14,
        color: "var(--nimbus-colors-neutral-textLow)",
        marginBottom: 8,
      }}
    >
      Durations and easing curves aligned with the motion-design scale. Use
      theme variables in vanilla-extract via{" "}
      <code style={{ fontSize: 13 }}>varsThemeBase.motion.duration</code> and{" "}
      <code style={{ fontSize: 13 }}>varsThemeBase.motion.easing</code>, or the
      CSS variables below.
    </p>

    <h2 style={styles.sectionTitle}>Duration</h2>
    <p style={styles.sectionDesc}>
      Semantic steps (120ms–800ms). Prefer these for new work; legacy{" "}
      <code>motion.speed.*</code> remains for existing components.
    </p>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Token</th>
          <th style={styles.th}>Preview</th>
          <th style={styles.th}>Value</th>
          <th style={styles.th}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {DURATION_KEYS.map((key) => {
          const entry = motion.duration[key];
          const cssVar = durationCssVar(key);
          return (
            <tr key={key}>
              <td style={styles.td}>
                <strong>duration.{key}</strong>
                <span style={styles.tokenName}>{cssVar}</span>
              </td>
              <td style={{ ...styles.td, width: 160 }} aria-label={`Duration preview for ${key}`}>
                <DurationPreview cssVarDuration={cssVar} />
              </td>
              <td
                style={{
                  ...styles.td,
                  fontFamily: "monospace",
                  fontSize: 12,
                }}
              >
                {entry.value}
              </td>
              <td style={{ ...styles.td, color: "var(--nimbus-colors-neutral-textLow)", fontSize: 12 }}>
                {entry.comment ?? "—"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <h2 style={styles.sectionTitle}>Legacy speed</h2>
    <p style={styles.sectionDesc}>
      Original four-step scale; kept for backward compatibility.
    </p>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Token</th>
          <th style={styles.th}>CSS variable</th>
          <th style={styles.th}>Value</th>
        </tr>
      </thead>
      <tbody>
        {(["fast", "base", "slow", "slower"] as const).map((key) => {
          const entry = motion.speed[key];
          return (
            <tr key={key}>
              <td style={styles.td}>
                <strong>speed.{key}</strong>
              </td>
              <td style={{ ...styles.td, ...styles.tokenName }}>
                var(--nimbus-motion-speed-{key})
              </td>
              <td style={{ ...styles.td, fontFamily: "monospace", fontSize: 12 }}>
                {entry.value}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <h2 style={styles.sectionTitle}>Easing</h2>
    <p style={styles.sectionDesc}>
      Use <strong>out.*</strong> for enter/exit, <strong>inOut.*</strong> for
      on-screen morph/layout, <strong>in.*</strong> sparingly. Use the play
      control to
      compare curves (fixed duration: theme duration.2).
    </p>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Token path</th>
          <th style={styles.th}>Preview</th>
          <th style={styles.th}>Value</th>
        </tr>
      </thead>
      <tbody>
        {EASING_ROWS.map(({ path, cssVar }) => {
          const entry = getEasingTokenEntry(path);
          const displayPath = `motion.easing.${path}`;
          return (
            <tr key={path}>
              <td style={styles.td}>
                <strong>{displayPath}</strong>
                <span style={styles.tokenName}>{cssVar}</span>
              </td>
              <td style={{ ...styles.td, width: 160 }} aria-label={`Easing preview for ${path}`}>
                <EasingPreview cssVarEasing={cssVar} />
              </td>
              <td
                style={{
                  ...styles.td,
                  fontFamily: "monospace",
                  fontSize: 11,
                  wordBreak: "break-word" as const,
                  color: "var(--nimbus-colors-neutral-textLow)",
                }}
              >
                {entry?.value ?? "—"}
                {entry?.comment ? (
                  <div style={{ marginTop: 6, fontSize: 12 }}>{entry.comment}</div>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <h2 style={styles.sectionTitle}>Reduced motion</h2>
    <p style={styles.sectionDesc}>
      Respect user preferences in product surfaces; example global override:
    </p>
    <pre style={styles.codeBlock}>
{`@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}
    </pre>
  </div>
);

MotionTokensPage.displayName = "MotionTokensPage";

const meta: Meta = {
  title: "Tokens/Motion",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => <MotionTokensPage />,
};
