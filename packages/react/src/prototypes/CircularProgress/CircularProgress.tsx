import React, { useId, useMemo } from "react";

/**
 * Disposable prototype — a **standalone** circular progress component.
 *
 * It is deliberately not a `circular` variant of `@nimbus-ds/progress-bar`.
 * The linear bar owns "measurable progress along a track"; a ring owns
 * "measurable progress in a fixed square footprint, usually with the value at
 * its centre". Only the *semantic and accessibility contract* is borrowed from
 * `ProgressBar` (see `REUSED_FROM_PROGRESS_BAR` below); the rendering is
 * explored here on its own terms.
 *
 * Nothing in this file is production code: no package, no export barrel, no
 * release declaration.
 */

/* -------------------------------------------------------------------------- */
/* What is borrowed from ProgressBar, and what is not                          */
/* -------------------------------------------------------------------------- */

/**
 * Kept identical to `@nimbus-ds/progress-bar` on purpose, so a product moving
 * between the two shapes does not relearn the contract:
 *
 * - `value: number` clamped to 0-100 (ProgressBar clamps with the same
 *   `Math.min(100, Math.max(0, value))`);
 * - `role="progressbar"` + `aria-valuenow` / `aria-valuemin` / `aria-valuemax`;
 * - the `appearance` set and the very same colour tokens
 *   (`--nimbus-colors-<appearance>-interactive`);
 * - the `backgroundColor` track choice
 *   (`neutral-surfaceDisabled` | `neutral-background`);
 * - the `--nimbus-motion-speed-slow` transition token.
 *
 * Deliberately **not** borrowed:
 *
 * - `height` — meaningless for a ring; `size` + `thickness` replace it;
 * - `boxShadow` — the bar's shadow map is tuned for a 8px-tall rounded rect;
 * - the minimum-8px fill trick — on a ring that would render a visible dot at
 *   0%, so this prototype omits the arc entirely at 0 instead.
 */
export const REUSED_FROM_PROGRESS_BAR = [
  "value (0-100, clamped)",
  'role="progressbar" + aria-valuenow/valuemin/valuemax',
  "appearance set and *-interactive colour tokens",
  "backgroundColor track token choice",
  "motion.speed.slow transition token",
] as const;

export type CircularProgressAppearance =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "ai-generative";

/* -------------------------------------------------------------------------- */
/* Learning goal 3 — diameter / size scale                                     */
/* -------------------------------------------------------------------------- */

/**
 * A named scale rather than a free pixel number, following `Spinner`'s
 * precedent (`small` | `medium` | `large`, with a numeric escape hatch).
 *
 * The values are larger than Spinner's 16/24/32 because a ring that carries a
 * centre label has a floor Spinner does not have — see `fitLabelToken`. That
 * mismatch with Spinner's scale is an open question for the exploration, not a
 * settled decision.
 */
export const SIZES = {
  small: 40,
  medium: 64,
  large: 96,
} as const;

export type CircularProgressSize = keyof typeof SIZES;

/* -------------------------------------------------------------------------- */
/* Learning goal 4 — ring stroke width                                         */
/* -------------------------------------------------------------------------- */

/**
 * Named thicknesses are **ratios of the diameter**, not absolute pixels, so a
 * `regular` ring keeps the same proportion at every size. A raw `number` is
 * still accepted and is read as absolute pixels.
 *
 * The trade-off this exposes, and the reason both forms exist here:
 *
 * - ratio: the ring's proportion is stable across sizes, but two rings of
 *   different sizes sitting side by side have visibly different stroke weight;
 * - absolute px: optical weight is consistent in a mixed-size group, but
 *   `thick` swallows the hole on a small ring and looks hairline on a large one.
 */
export const THICKNESS_RATIOS = {
  thin: 0.06,
  regular: 0.1,
  thick: 0.14,
} as const;

export type CircularProgressThickness = keyof typeof THICKNESS_RATIOS;

/* -------------------------------------------------------------------------- */
/* Learning goal 5 — label legibility and position                             */
/* -------------------------------------------------------------------------- */

/**
 * The real Nimbus font-size tokens, smallest first, with the pixel value each
 * one resolves to at the default 16px root.
 *
 * This list is the whole point of the label approach: the centre label may only
 * ever be one of these tokens. The earlier progress-ring prototype sized the
 * label as `Math.max(11, size / 5)`, which invents values that exist nowhere in
 * the type scale (a 96px ring got 19px, a 32px ring got a hard-coded 11px —
 * below `caption`, and illegible).
 */
export const LABEL_STEPS = [
  { token: "caption", px: 12 }, // --nimbus-fontSize-body-caption   0.75rem
  { token: "base", px: 14 }, // --nimbus-fontSize-body-base      0.875rem
  { token: "highlight", px: 16 }, // --nimbus-fontSize-body-highlight 1rem
  { token: "h4", px: 20 }, // --nimbus-fontSize-title-h4       1.25rem
  { token: "h3", px: 24 }, // --nimbus-fontSize-title-h3       1.5rem
] as const;

export type LabelToken = (typeof LABEL_STEPS)[number]["token"];

/** The widest label the ring has to hold is `100%` — four glyphs. */
const LABEL_MAX_GLYPHS = 4;

/** Geist digits advance at ~0.6em; `%` is wider, so 0.62em is a safe mean. */
const GLYPH_ADVANCE_EM = 0.62;

/** The largest square inscribed in a circle of diameter d has side d / √2. */
const INSCRIBED_RATIO = 1 / Math.SQRT2;

/**
 * Picks the largest **real font-size token** whose text still fits inside the
 * ring's hole, or `null` when not even `caption` fits.
 *
 * `null` is the useful answer: it says "this diameter cannot hold a centre
 * label", which is exactly what the exploration needs to surface instead of
 * silently rendering something unreadable.
 */
export const fitLabelToken = (
  diameter: number,
  strokeWidth: number
): LabelToken | null => {
  const hole = diameter - 2 * strokeWidth;
  const usableWidth = hole * INSCRIBED_RATIO;
  const maxPx = usableWidth / (LABEL_MAX_GLYPHS * GLYPH_ADVANCE_EM);

  // Walk the token scale downwards. Never interpolate between two tokens.
  const fitting = [...LABEL_STEPS].reverse().find((step) => step.px <= maxPx);

  return fitting ? fitting.token : null;
};

export type CircularProgressLabelPlacement = "inside" | "outside" | "none";

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export interface CircularProgressProps {
  /** Progress value from 0 to 100. Clamped, exactly like `ProgressBar`. */
  value: number;
  /**
   * Visual style. Same set and same tokens as `ProgressBar`.
   * @default neutral
   */
  appearance?: CircularProgressAppearance;
  /**
   * Outer diameter: a named step, or absolute pixels while exploring.
   * @default medium
   */
  size?: CircularProgressSize | number;
  /**
   * Ring stroke: a named ratio of the diameter, or absolute pixels.
   * @default regular
   */
  thickness?: CircularProgressThickness | number;
  /**
   * Where the percentage sits. `inside` degrades to no label when the diameter
   * cannot hold one legibly — it never shrinks below `caption`.
   * @default inside
   */
  labelPlacement?: CircularProgressLabelPlacement;
  /** Track colour token, same choice as `ProgressBar`. */
  backgroundColor?: "neutral-surfaceDisabled" | "neutral-background";
  /** Replaces the percentage at the centre. Explores the composition question. */
  children?: React.ReactNode;
  /** Accessible name — the ring frequently stands alone, with no visible text. */
  label?: string;
}

const resolveDiameter = (size: CircularProgressSize | number): number =>
  typeof size === "number" ? size : SIZES[size];

const resolveStroke = (
  thickness: CircularProgressThickness | number,
  diameter: number
): number =>
  typeof thickness === "number"
    ? thickness
    : // Snapped to whole pixels: a fractional stroke renders blurry.
      Math.max(1, Math.round(diameter * THICKNESS_RATIOS[thickness]));

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  appearance = "neutral",
  size = "medium",
  thickness = "regular",
  labelPlacement = "inside",
  backgroundColor = "neutral-surfaceDisabled",
  children,
  label,
}) => {
  // Same clamp as ProgressBar.
  const clamped = useMemo(() => Math.min(100, Math.max(0, value)), [value]);

  const diameter = resolveDiameter(size);
  // A stroke wider than the radius would invert the ring, so cap it.
  const stroke = Math.min(
    resolveStroke(thickness, diameter),
    Math.floor(diameter / 2)
  );

  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const centre = diameter / 2;
  const rounded = Math.round(clamped);

  // One gradient definition per instance: SVG ids are document-global.
  const gradientId = `circular-progress-ai-${useId()}`;
  const isAi = appearance === "ai-generative";

  const strokeColor = isAi
    ? `url(#${gradientId})`
    : `var(--nimbus-colors-${appearance}-interactive)`;

  const labelToken =
    labelPlacement === "inside" ? fitLabelToken(diameter, stroke) : null;

  const percentageText = `${rounded}%`;

  const ring = (
    <div
      role="progressbar"
      aria-valuenow={rounded}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
      style={{
        position: "relative",
        width: diameter,
        height: diameter,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        // Start the arc at 12 o'clock instead of 3 o'clock.
        style={{ transform: "rotate(-90deg)", display: "block" }}
        aria-hidden="true"
        focusable="false"
      >
        {isAi && (
          <defs>
            {/* ProgressBar paints ai-generative with a CSS background-image
                gradient. A stroke cannot take one, so the same three token
                stops are re-expressed as an SVG gradient. gradientTransform
                cancels the -90deg wrapper rotation so the sweep keeps the
                50deg direction the bar uses. */}
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientTransform="rotate(90, 0.5, 0.5)"
            >
              <stop
                offset="28.22%"
                stopColor="var(--nimbus-colors-aiGradient-blueHigh)"
              />
              <stop
                offset="49.27%"
                stopColor="var(--nimbus-colors-aiGradient-purpleHigh)"
              />
              <stop
                offset="83.12%"
                stopColor="var(--nimbus-colors-aiGradient-pinkHigh)"
              />
            </linearGradient>
          </defs>
        )}

        {/* Track */}
        <circle
          cx={centre}
          cy={centre}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          stroke={`var(--nimbus-colors-${
            backgroundColor === "neutral-background"
              ? "neutral-background"
              : "neutral-surfaceDisabled"
          })`}
        />

        {/* Arc. Omitted at 0 rather than kept at a minimum length: a round cap
            on a zero-length dash paints a dot, which reads as "some progress"
            when there is none. This is where the ring has to diverge from
            ProgressBar's minimum-8px fill. */}
        {clamped > 0 && (
          <circle
            cx={centre}
            cy={centre}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            stroke={strokeColor}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - clamped / 100)}
            style={{
              transition:
                "stroke-dashoffset var(--nimbus-motion-speed-slow) ease",
            }}
          />
        )}
      </svg>

      {(children || labelToken) && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Keep the centre content inside the hole, never over the stroke.
            maxWidth: (diameter - 2 * stroke) * INSCRIBED_RATIO,
            textAlign: "center",
          }}
        >
          {children ?? (
            <span
              // The value is already announced through aria-valuenow; letting a
              // screen reader read the glyphs too would say it twice.
              aria-hidden="true"
              style={{
                fontFamily: "var(--nimbus-fontFamily-sans)",
                fontSize: `var(--nimbus-fontSize-${
                  labelToken === "h4" || labelToken === "h3"
                    ? `title-${labelToken}`
                    : `body-${labelToken}`
                })`,
                fontWeight: "var(--nimbus-fontWeight-medium)",
                lineHeight: 1,
                color: "var(--nimbus-colors-neutral-textHigh)",
                whiteSpace: "nowrap",
              }}
            >
              {percentageText}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (labelPlacement !== "outside") return ring;

  // Outside placement is the honest fallback for the small end of the scale:
  // the value stays at `caption` and stops competing with the ring's hole.
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--nimbus-spacing-2)",
      }}
    >
      {ring}
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--nimbus-fontFamily-sans)",
          fontSize: "var(--nimbus-fontSize-body-caption)",
          fontWeight: "var(--nimbus-fontWeight-medium)",
          color: "var(--nimbus-colors-neutral-textHigh)",
          whiteSpace: "nowrap",
        }}
      >
        {percentageText}
      </span>
    </div>
  );
};

CircularProgress.displayName = "CircularProgress";
