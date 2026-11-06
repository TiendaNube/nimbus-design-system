const TONES = [
  "primary",
  "success",
  "warning",
  "danger",
  "aiGenerative",
] as const;

type Tone = (typeof TONES)[number];

type WithSurfaceDisabled<T> = {
  [K in keyof T]: K extends Tone ? T[K] & { surfaceDisabled: string } : T[K];
};

/**
 * Adds the tone-level `surfaceDisabled` color to a theme's color groups.
 */
export const withToneSurfaceDisabled = <T extends Record<Tone, object>>(
  surfaceDisabled: string,
  colors: T
): WithSurfaceDisabled<T> =>
  TONES.reduce(
    (acc, tone) => ({
      ...acc,
      [tone]: { ...colors[tone], surfaceDisabled },
    }),
    colors
  ) as WithSurfaceDisabled<T>;
