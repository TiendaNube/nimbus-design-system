/**
 * Fixture for `check-native-attr-collisions.spec.ts`.
 *
 * Every declaration here intersects a real React native-attributes type and really does
 * collide on at least one key. Only some of those collisions are harmful, which is the whole
 * point: the checker decides by assignability, not by name. Nothing instantiates these types,
 * so `tsc --noEmit` stays green — exactly the way the five real bugs on `master` stay latent.
 */

import type { DragEvent, HTMLAttributes, ReactNode } from "react";

/** The responsive object form a Nimbus sprinkle prop accepts, in miniature. */
export interface ResponsiveColor {
  xs: string;
  md: string;
}

interface IdenticalProperties {
  /** Collides with `HTMLAttributes.children`, same type. Harmless. */
  children?: ReactNode;
}

/** No finding expected: the colliding key has an identical type on both sides. */
export type IdenticalProps = IdenticalProperties &
  HTMLAttributes<HTMLDivElement>;

interface NarrowedProperties {
  /** Collides with `HTMLAttributes.id?: string`, narrowed to required. Still usable. */
  id: string;
}

/** No finding expected: the collision narrows the prop but a `string` still passes. */
export type NarrowedProps = NarrowedProperties & HTMLAttributes<HTMLDivElement>;

interface ConflictingProperties {
  /** Collides with the non-standard `HTMLAttributes.color?: string`. Unusable. */
  color?: ResponsiveColor;
}

/** One finding expected on `color`: `ResponsiveColor & string` has no inhabitants. */
export type ConflictingProps = ConflictingProperties &
  HTMLAttributes<HTMLDivElement>;

interface HandlerProperties {
  /** Collides with `DOMAttributes.onError?: ReactEventHandler<T>`. Unusable. */
  onError?: (error: Error) => void;
  /** Collides with `DOMAttributes.onDrop?: DragEventHandler<T>`, same signature. Harmless. */
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;
}

/**
 * One finding expected, on `onError` only — the `FileUploader` pattern reproduced: two
 * handler props colliding the same way in the same declaration, one broken and one fine.
 */
export type HandlerProps = HandlerProperties & HTMLAttributes<HTMLDivElement>;

/**
 * A repo-local name a suffix-only match would mistake for a React type — the same trap as
 * `OmittedHTMLAttributes` in `timePicker.types.ts`. It even declares a conflicting `color`.
 */
export interface LocalHTMLAttributes {
  color?: string;
}

/**
 * No finding expected: `LocalHTMLAttributes` is declared here, not in `@types/react`, so this
 * declaration has no native side. A checker matching names by suffix alone would classify it
 * as one and report `color` — which is why the name list is read out of `@types/react`.
 */
export type LocalLookAlikeProps = ConflictingProperties & LocalHTMLAttributes;

/** No finding expected: the colliding key is omitted from the native side, the correct fix. */
export type GuardedProps = ConflictingProperties &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ConflictingProperties>;

/** The controlled variant of a two-shape props type, as `ControlledTabsProperties` is. */
interface ControlledConflictingProperties extends ConflictingProperties {
  selected: number;
}

/**
 * One finding expected on `color`. The `TabsProps` shape (`tabs.types.ts:42`) reproduced: a
 * leading `|` makes the declaration a *union of one constituent* wrapping the intersection, and
 * the own side is itself a parenthesized union. A checker that only flattens
 * `IntersectionTypeNode` finds no native side here and skips the whole declaration — which in
 * the output is indistinguishable from a declaration that came out clean. `color` is declared by
 * both constituents and is not omitted from the native side, so it must be reported.
 */
export type LeadingPipeProps =
  | (ConflictingProperties | ControlledConflictingProperties) &
      Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * No finding expected, and not silently ignored either: which constituent a consumer holds
 * decides which keys collide, so there is no single own side and native side to compare. The
 * checker reports this declaration as skipped.
 */
export type UnionArmProps =
  | (ConflictingProperties & HTMLAttributes<HTMLDivElement>)
  | (HandlerProperties & HTMLAttributes<HTMLDivElement>);
