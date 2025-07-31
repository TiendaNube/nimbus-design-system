/**
 * This file is originally from `@radix-ui/react-polymorphic` before the package
 * was deprecated. The original source for this lived in the URL below.
 *
 * @see https://github.com/radix-ui/primitives/blob/17ffcb7aaa42cbd36b3c210ba86d7d73d218e5be/packages/react/polymorphic/src/polymorphic.ts
 */

import React, { ReactNode } from "react";

/* -------------------------------------------------------------------------------------------------
 * Utility types
 * -----------------------------------------------------------------------------------------------*/
type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;


/**
 * Properties for SVG elements including common attributes and flexible extension.
 * Used for typing SVG element props in gradient applications and icon components.
 */
type SVGElementProps = {
  fill?: string;
  stroke?: string;
  children?: ReactNode;
  [key: string]: unknown;
};

/**
 * Infers the OwnProps if E is a ForwardRefExoticComponentWithAs
 */
type OwnProps<E> = E extends PolymorphicForwardRefComponent<any, infer P>
  ? P
  : {};

/**
 * Infers the JSX.IntrinsicElement if E is a ForwardRefExoticComponentWithAs
 */
type IntrinsicElement<E> = E extends PolymorphicForwardRefComponent<
  infer I,
  any
>
  ? I
  : never;

type ForwardRefExoticComponent<E, OwnProps> = React.ForwardRefExoticComponent<
  Merge<
    E extends React.ElementType ? React.ComponentPropsWithRef<E> : never,
    OwnProps & { as?: E }
  >
>;

/* -------------------------------------------------------------------------------------------------
 * PolymorphicForwardRefComponent
 * -----------------------------------------------------------------------------------------------*/

interface PolymorphicForwardRefComponent<
  IntrinsicElementString,
  OwnProps = {}
  /**
   * Extends original type to ensure built in React types play nice
   * with polymorphic components still e.g. `React.ElementRef` etc.
   */
> extends ForwardRefExoticComponent<IntrinsicElementString, OwnProps> {
  /**
   * When `as` prop is passed, use this overload.
   * Merges original own props (without DOM props) and the inferred props
   * from `as` element with the own props taking precendence.
   *
   * We explicitly avoid `React.ElementType` and manually narrow the prop types
   * so that events are typed when using JSX.IntrinsicElements.
   */
  <As = IntrinsicElementString>(
    props: As extends ""
      ? { as: keyof JSX.IntrinsicElements }
      : As extends React.ComponentType<infer P>
      ? Merge<P, OwnProps & { as: As }>
      : As extends keyof JSX.IntrinsicElements
      ? Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
      : never
  ): React.ReactElement | null;
}

export type {
  PolymorphicForwardRefComponent,
  OwnProps,
  IntrinsicElement,
  Merge,
  SVGElementProps,
};
