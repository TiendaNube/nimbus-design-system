import React from "react";

/**
 * Prototype-only icons.
 *
 * These are NOT added to `packages/icons/src/assets` — the nimbus-prototype
 * boundaries forbid modifying production packages to support an
 * exploration. They are placeholder-quality traces of the two new icons
 * shown in the Figma reference (file `TDwgeblsVNeHKKRvoDRk7n`, node
 * `7046:18927`, mobile `pageCount=>6` variant) for the "jump to first page"
 * and "jump to last page" controls that the 6+ items mobile layout needs.
 * A real contribution would add these through `.cursor/rules/icon-creation.mdc`
 * (packages/icons/src/assets, changelog, version bump, dedicated PR).
 */

export const ChevronFirstIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4.5166 1.64291V14.6292H3.2666L3.2666 1.64291H4.5166Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.06735 8.08294L12.7334 13.7462L11.8498 14.6303L6.1543 8.93767C5.63648 8.47127 5.63737 7.69025 6.15698 7.22493L11.8541 1.64185L12.729 2.53462L7.06735 8.08294Z"
    />
  </svg>
);
ChevronFirstIcon.displayName = "ChevronFirstIcon";

export const ChevronLastIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.93267 8.05309L3.2666 2.38984L4.15026 1.50574L9.84573 7.19836C10.3636 7.66476 10.3627 8.44578 9.84304 8.9111L4.14588 14.4942L3.27098 13.6014L8.93267 8.05309Z"
    />
    <path d="M12.7334 1.50681V14.4931H11.4834V1.50681H12.7334Z" />
  </svg>
);
ChevronLastIcon.displayName = "ChevronLastIcon";
