import React from "react";

/**
 * Disposable prototype. Mirrors the public surface of `@nimbus-ds/progress-bar`
 * on purpose: the open question is whether the ring shape reads better in a
 * tight space with a value at its centre, not what a new API should look like.
 */
export type ProgressRingAppearance =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "ai-generative";

export interface ProgressRingProps {
  /** Progress value from 0 to 100. */
  value: number;
  /** Same appearance set as ProgressBar. */
  appearance?: ProgressRingAppearance;
  /** Outer diameter in pixels. */
  size?: number;
  /** Ring thickness in pixels. */
  thickness?: number;
  /** Content at the centre. Defaults to the rounded percentage. */
  children?: React.ReactNode;
  /** Accessible name, since the centre label alone is not one. */
  label?: string;
}

/**
 * `ai-generative` has no single `interactive` token — ProgressBar paints it with
 * a gradient. The ring falls back to the primary token, which is one of the
 * things this prototype fakes.
 */
const strokeFor = (appearance: ProgressRingAppearance): string =>
  appearance === "ai-generative"
    ? "var(--nimbus-colors-primary-interactive)"
    : `var(--nimbus-colors-${appearance}-interactive)`;

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  appearance = "neutral",
  size = 96,
  thickness = 8,
  children,
  label,
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const centre = size / 2;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={centre}
          cy={centre}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          stroke="var(--nimbus-colors-neutral-surfaceDisabled)"
        />
        <circle
          cx={centre}
          cy={centre}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          stroke={strokeFor(appearance)}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          style={{ transition: "stroke-dashoffset 320ms ease" }}
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        {children ?? (
          <span
            style={{
              fontFamily: "var(--nimbus-fontFamily-sans)",
              fontSize: `${Math.max(11, Math.round(size / 5))}px`,
              fontWeight: 600,
              color: "var(--nimbus-colors-neutral-textHigh)",
            }}
          >
            {Math.round(clamped)}%
          </span>
        )}
      </div>
    </div>
  );
};
