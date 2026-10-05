import React, { useState } from "react";

let counter = 0;

const useFallbackId = () => {
  const [id] = useState(() => {
    counter += 1;
    return `:nimbus-pagination-${counter}`;
  });
  return id;
};

/**
 * Uses React's `useId` when available (React 18+, hydration-safe) and falls
 * back to a per-instance counter on the older versions this package supports.
 */
const useId: () => string =
  (React as unknown as { useId?: () => string }).useId ?? useFallbackId;

export const useUniqueId = (): string => useId();
